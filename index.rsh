'reach 0.1';


const Persons = {
  informTimeout: Fun([], Null),
  viewIdea1:  Fun([UInt], Null),
  viewIdea2:  Fun([UInt], Null),
  voteIdea: Fun([], UInt),
  seeOutcome: Fun([UInt], Null)
}

export const main = Reach.App(() => {
const user1 = Participant("user1", {
  ...Persons,
  funds: UInt,
  deadline: UInt, 
  
});
const user2 = Participant("user2", {
  ...Persons,
  accepFunds: Fun([UInt], Null),   ///acceptFunds= (funds) => {do wahtsoever with funds}
  
});
const user3 = Participant("user3", {
  ...Persons,
  accepFunds: Fun([UInt], Null),   ///acceptFunds= (funds) => {do wahtsoever with funds}
});

const Proposer1 = Participant("Proposer1", {
  proposeIdea: Fun([], UInt)
});

const Proposer2 = Participant("Proposer2", {
  proposeIdea: Fun([], UInt)
})
init();

//setting timeout
const informTimeout = () => {
  each([user1, user2, user3], ()=> {  //should have user 3
    interact.informTimeout();
  })
};

//propose ideas
Proposer1.only(() => {
  const idea1 = declassify(interact.proposeIdea());
});
Proposer1.publish(idea1);

commit();

Proposer2.only(() => {
  const idea2 = declassify(interact.proposeIdea());
})

Proposer2.publish(idea2);

commit();


//Now we have two ideas (idea1 and idea2) all we need to do is pay tokens into the contract and vote on them

//for each user, you will call viewIdea1 and viewIdea2 then voiteIdea

//for user1 only
user1.only(()=> {
  const funds = declassify(interact.funds); 
  const deadline = declassify(interact.deadline) 
  const ideaOne = declassify(interact.viewIdea1(idea1));
  const ideaTwo = declassify(interact.viewIdea2(idea2));
  const vote1 = declassify(interact.voteIdea());
  assume(vote1 == idea1 || vote1 ==idea2)
  assert(vote1 == idea1 || vote1 ==idea2);
});
  user1.publish(funds, deadline, vote1);
  require(vote1 == idea1 || vote1 ==idea2 );
  commit();
  user1.pay(funds)
  //must send out 
  commit();
  
  //for user2 only
user2.only(()=> {
  interact.accepFunds(funds);
  const ideaOne = declassify(interact.viewIdea1(idea1));
  const ideaTwo = declassify(interact.viewIdea2((idea2)));
  const vote2 = declassify(interact.voteIdea());
  assume(vote2 == idea1 || vote2 ==idea2);
  assert(vote2 == idea1 || vote2 ==idea2);
});
user2.publish(vote2);
require(vote2 == idea1 || vote2 == idea2)
commit();
user2.pay(funds)
  .timeout(relativeTime(deadline), () => closeTo(user1, informTimeout));
  commit();
user2.publish();
commit();


//let user3 also pay funds into the contract and vote
user3.only(()=> {
  interact.accepFunds(funds);
  const ideaOne = declassify(interact.viewIdea1(idea1));
  const ideaTwo = declassify(interact.viewIdea2((idea2)));
  const vote3 = declassify(interact.voteIdea());
  assume(vote3 == idea1 || vote3 == idea2);
  assert(vote3 == idea1 || vote3 == idea2);
});

user3.pay(funds)
  .timeout(relativeTime(deadline), () => closeTo(user1, informTimeout));
  commit();
user3.publish(vote3);
require(vote3 == idea1 || vote3 ==idea2)


//Time to vote
if(vote1 == idea1 && vote2 == idea1){transfer( funds * 3).to(Proposer1)} 
else if(vote1 == idea2 && vote2 == idea2){transfer(funds * 3 ).to(Proposer2)}
else if(vote1 == idea1 && vote3 == idea1){transfer(funds * 3 ).to(Proposer1)} 
else if(vote1 == idea2 && vote3 == idea2){transfer(funds * 3 ).to(Proposer2)}
else if(vote2 == idea2 && vote3 == idea2){transfer(funds * 3 ).to(Proposer2)}
else if(vote2 == idea1 && vote3 == idea1){transfer(funds * 3 ).to(Proposer1)}
//if(true){transfer to proposer1}




commit();

  exit();
  });