import { loadStdlib, ask } from '@reach-sh/stdlib';

import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib({network: 'LocalHost'})
console.log(await stdlib.canFundFromFaucet())
// stdlib.setProviderByName('LocalHost')

const startingBalance = stdlib.parseCurrency(1000);
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

const ctcProposer1 = accProposer1.contract(backend);
const ctcUser2 = accUser2.contract(backend, ctcProposer1.getInfo());
const ctcUser3 = accUser3.contract(backend, ctcProposer1.getInfo());
const ctcUser1 = accUser1.contract(backend, ctcProposer1.getInfo());
const ctcProposer2 = accProposer2.contract(backend, ctcProposer1.getInfo())

const OUTCOME = ["idea1", "idea2"]
const Persons = (Who) =>({
    informTimeout: () => {
        console.log(`${Who} observed a timeout`);
    },
})



try{
await Promise.all([

            //PUBLISH IDEAS TO BE VOTED FOR 
    ctcProposer1.p.Proposer1({
        proposeIdea: ()=>{
        console.log(`Increase volatility of assets`);
        return 1;
    }
    }),
    
    ctcProposer2.p.Proposer2({
        proposeIdea: ()=> {
        console.log(`make system decentralized`);
        return 2;
    }
    }),

        //THE THREE(3) PARTICIPANTS
    ctcUser1.p.user1({
        ...Persons("user1"),
        funds: stdlib.parseCurrency(200),
        deadline: 5,
    viewIdea1: (idea) => console.log(`User1 view idea ${idea}`),
    viewIdea2: (idea) => console.log(`User1 view idea ${idea}`),
    voteIdea: async() => {return 1},
    }),
    ctcUser2.p.user2({
        ...Persons("user2"),
        accepFunds: async (amt) => {
            console.log(`user2 pays ${fmt(amt)} to the network`);
        },
        viewIdea1: (idea) => console.log(`User2 view idea ${idea}`),
        viewIdea2: (idea) => console.log(`User2 view idea ${idea}`),
        voteIdea: async() => {return 2}

    }),
    ctcUser3.p.user3({
        ...Persons("user3"),
        accepFunds: (amt)=> {
            console.log(`user3 also pays ${fmt(amt)} to the network`);
        },
        viewIdea1: (idea) => console.log(`User3 view idea ${idea}`),
        viewIdea2: (idea) => console.log(`User3 view idea ${idea}`),
        voteIdea: async() => {return 2}
    }),


]);
}catch(err){
    console.log(err);
}

const afterUser1 = await getBalance(accUser1);
const afterUser2 = await getBalance(accUser2);
const afterUser3 = await getBalance(accUser3);
const afterProposer1 = await getBalance(accProposer1);
const afterProposer2 = await getBalance(accProposer2)

console.log(`User1 went from ${beforeUser1} to ${afterUser1}`);
console.log(`User2 went from ${beforeUser2} to ${afterUser2}`);
console.log(`User3 went from ${beforeUser3} to ${afterUser3}`)
console.log(`Proposer1 went from ${beforeProposer1} to ${afterProposer1}`)
console.log(`Proposer2 sent from ${beforeProposer2} ${afterProposer2}`)