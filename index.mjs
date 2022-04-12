import { loadStdlib, ask } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();

const startingBalance = stdlib.parseCurrency(100);

const accUser1 = await stdlib.newTestAccount(startingBalance);
const accUser2 = await stdlib.newTestAccount(startingBalance);
const accUser3 = await stdlib.newTestAccount(startingBalance);
const accProposer1 = await stdlib.newTestAccount(startingBalance);
const accProposer2 = await stdlib.newTestAccount(startingBalance);

const fmt = (x)=> stdlib.formatCurrency(x, 4);
const getBalance = async(who) => fmt(await stdlib.balanceOf(who));
const beforeUser1 = await getBalance(accUser1);
const beforeUser2 = await getBalance(accUser2);
const beforeUser3 = await getBalance(accUser3);
const beforeProposer1 = await getBalance(accProposer1);
const beforeProposer2 = await getBalance(accProposer2);

const ctcUser1 = accUser1.contract(backend);
const ctcUser2 = accUser2.contract(backend, ctcUser1.getInfo());
const ctcUser3 = accUser3.contract(backend, ctcUser1.getInfo());
const ctcProposer1 = accProposer1.contract(backend, ctcUser1.getInfo())
const ctcProposer2 = accProposer2.contract(backend, ctcUser1.getInfo())




await Promise.all([
    ctcProposer1.p.Proposer1({
    idea1: ()=>{
        console.log(`Support the less previlege in Africa`);
        return 1;
    }
    }),
    ctcProposer2.p.Proposer2({
    idea2: ()=> {
        console.log(`Help the orphange home`);
        return 2;
    }
    }),
    ctcUser1.p.user1({
        funds: stdlib.parseCurrency(10),
        ideaOne: (x)=> {
            console.log(`user1 views
            ${idea1} and 
            ${idea2}`);
        }
        
    }),
    ctcUser2.p.user2({
        accepFunds: (amt) => {
            console.log(`user2 pays ${fmt(amt)} to the network`);
        },

    }),
    ctcUser3.p.user3({
        accepFunds: (amt)=> {
            console.log(`user3 also pays ${fmt(amt)} to the network`);
        }
    }),


])
        

        
// const voteFor = await ask.ask(
    //     `Do you want to vote the first idea?`,
    //     ask.yesno
    // );
    // let votedFor = voteFor ? "First idea" : "Second idea";
    // console.log(`You voted: ${votedFor}`);

    // let check = await ask.ask(
        //     `Are you USER1 or USER2? If not please enter n`,
        //     ask.yesno
        //   );
        
        //   const who = check ? 'User' : 'Participant';
        //   console.log(`Welcome ${who}`);

        
                            // interact.informTimeout = () => {
                            //     console.log(`There was a timeout.`);
                            //     process.exit(1);
                            // }

        // const startingBalance = stdlib.parseCurrency(100);
        // const acUsr1 = await stdlib.newTestAccount(startingBalance);
        // const acUsr2 = await stdlib.newTestAccount(startingBalance);
        // const acUsr3 = await stdlib.newTestAccount(startingBalance);
        
        // const ctcUsr1 = acUsr1.contract(backend);
        // const ctcUsr2 = acUsr2.contract(backend, ctcUsr1.getInfo());
        // const ctcUsr3 = acUsr3.contract(backend, ctcUsr2.getInfo());
        
        // await Promise.all([
            //     ctcUsr1.p.user1({
                
                //     }),
                //     ctcUsr2.p.user2({
                    
                    //     }),
                    //     ctcUsr3.p.user3({
                        
                        //     }),./
                        // ])
                        
                    
// THE MAIN CODE
// import { loadStdlib, ask } from "@reach-sh/stdlib";
// import * as backend from "./build/index.main.mjs";
// const stdlib = loadStdlib();


// const CHECK = ["User1", "User2", "User3"];
// const CHECKS = {
//     "user1": 0, "one": 0, "1": 0, "first": 0, 
//     "user2": 1, "two": 1, "2": 1, "second": 1,
//     "user3": 2, "three": 2, "3": 2, "third": 2,
// };
// let check = await ask.ask(
//     `Are you user1, user2 or user3 ?`,
//     (x)=> {
//         const check = CHECKS[x];
//         if(check === undefined) {
//             throw Error(`Not a valid ${CHECK}`)
//         }
//         return check;
//     });
    
//     console.log(`Welcome ${CHECK[check]}`);

        
//         let acc = null;
//         const creatAcc = await ask.ask(
//             `Would you like to create an Account? (only possible on devnet)`,
//             ask.yesno
//             );
            
//             if(creatAcc) {
//                 acc = await stdlib.newTestAccount(stdlib.parseCurrency(1000))
//             }else {
//                 const secret = await ask.ask(
//                     `What is your account secret?`,
//                     (x => x)
//                     );
//     acc = await stdlib.newAccountFromSecret(secret);
// }

// let ctc = null;
// if(check) {
//     ctc = acc.contract(backend);
//     ctc.getInfo().then((info) => {
//         console.log(`The contract is deployed as = ${JSON.stringify(info)}`);});
//     }else {
//         const info = await ask.ask(
//             `Please paste the contract information: `, JSON.parse
//             );
//             ctc = acc.contract(backend, info)
//         }
        
//         const fmt = (x) => stdlib.formatCurrency(x, 4);
//         const getBalance = async () => fmt(await stdlib.balanceOf(acc));
        
//         const before = await getBalance();
//         console.log(`Your balance is ${before}.`);
        
        
        
//         if(check){
//             const funds = await stdlib.parseCurrency(20);
//             let interact = {};
//                 interact.funds = funds;
//                 interact.deadline = { ETH: 100, ALGO: 100, CFX: 1000 }[stdlib.connector];
//             }else{
//                 interact.acceptFunds() = async (funds) => {
//                     const accepted = await ask.ask(
//                         `Do you accept the amount to pay ${funds} token to enable you vote?`,
//                         ask.yesno
//                         );
//                         if(!accepted) {
//                             process.exit(0);
//                         }
//                     };
//                 }
                
                
//                 const Proposer1=()=> {
//                     let proposeIdea = `First Idea: Increase volatility.`;
//                     console.log(proposeIdea);
//                 };
// // setTimeout(Proposer1, 2000);
// Proposer1();
// const Proposer2=()=> {
//     let proposeIdea = `Second Idea: Decrease tokens to stake on.`;
//     console.log(proposeIdea);
// };
// // setTimeout(Proposer2, 4000);
// Proposer2();

    
//     const OPTION = ["ProposeIdea1", "ProposeIdea2"];
//     const OPTIONS = {
//         "ProposeIdea1": 0, "one": 0, "1": 0, "first": 0,  
//         "ProposeIdea2": 1, "two": 1, "2": 1, "second": 1,  
//     };
    
//     let interact = {};
//     interact.vote1 = async () => {
//         const pick = await ask.ask(
//             `Which Idea are you picking?`,
//             (x)=>{
//                 const pick = OPTIONS[x];
//                 if (pick === undefined) {
//                     throw Error(`Not a valid ${pick}`)
//                 }
//                 return pick;
//             });
//             console.log(`You selected ${OPTION[pick]}`);
//             return pick;
//         }
        
//         const OUTCOME =["ProposeIdea1 wins", "ProposeIdea2 wins"];
//         interact.seeOutcome = async (outcome)=> {
//             console.log(`The outcome of the vote is ${OUTCOME[outcome]}`);
//         };

// const intUser1 =() =>{
//     informTimeout:(x) => {}
//     viewIdea1: (x) => {}
//     viewIdea2: (x) => {}
//     voteIdea: () => {return }
//     seeOutcome: (x) => {}
// };

// const intUser2 = () =>{
//     accepFunds: (x)=> {}
//     informTimeout: ()=> {}
//     viewIdea1: (x)=> {}
//     viewIdea2: (x)=> {}
//     voteIdea: ()=> {return }
//     seeOutcome: (x)=> {}

// }