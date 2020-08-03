import Vue from "vue"
import moment from "moment"
import { firestoreAction } from 'vuexfire'
import { db, storage } from 'boot/firebase'
import {uid} from "quasar"


const state ={

    dishes: {},
    menu:{
        breakfasts: {},
        lunchs: {},
        dinners: {}
    },
    menu2:{
        breakfasts: {},
        lunchs: {},
        dinners: {}
    },

}

const mutations = {

}

// =============== CONVERT UTILS =================

const objToArray = obj => Object.values(obj);

const objToArrayWithKey = (obj) => Object.keys(obj).map(key => [key, obj[key]]);

// ===============================================

const actions = {

    // ================ DATABASE BINDS ==================

    bindBreakfast: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('menu.breakfasts', db.collection('menu').doc('breakfasts').collection('breakfast'))
    }),

    bindLunch: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('menu.lunchs', db.collection('menu').doc('lunchs').collection('lunch'))
    }),

    bindDinner: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('menu.dinners', db.collection('menu').doc('dinners').collection('dinner'))
    }),
    bindBreakfast2: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('menu2.breakfasts', db.collection('menu').doc('breakfasts').collection('breakfast'))
    }),

    bindLunch2: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('menu2.lunchs', db.collection('menu').doc('lunchs').collection('lunch'))
    }),

    bindDinner2: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('menu2.dinners', db.collection('menu').doc('dinners').collection('dinner'))
    }),

    bindDishes: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('dishes', db.collection('dishes'))
    }),

    // ==================================================

    createDish ({}, payload) {
        console.log(payload)
        let docID
        db.collection("dishes").add({

        })
        .then(response => {
            docID = response.id
            const storageRef =  storage.ref().child('/dishes/'+uid()+'.jpeg').put(payload.image)
            storageRef.on(
                'state_changed',
                snapshot => console.log(snapshot),
                error => console.log(error),
                () => {
                    storageRef.snapshot.ref.getDownloadURL().then(downloadURL => {
                        db.collection("dishes").doc(docID).update({
                            dishID: docID,
                            itemName: payload.name,
                            itemType: payload.type,
                            itemDescription: payload.description,
                            itemHave: payload.contain,
                            vegan: payload.vegan,
                            vegie: payload.vegie,
                            favoriteTotal: 0,
                            ratingAvg: 0,
                            totalRating: 0,
                            itemImage : downloadURL,
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        db.collection("dishes").doc(docID).delete()
                    })
                }
            )
        })
    },
    editDish ({}, payload) {
        console.log(payload)
        if(payload.image == null){
            db.collection("dishes").doc(payload.dishID).update({
                itemName: payload.name,
                itemType: payload.type,
                itemDescription: payload.description,
                itemHave: payload.contain,
                vegan: payload.vegan,
                vegie: payload.vegie,
            })
        }
        else{
            const storageRef =  storage.ref().child('/dishes/'+uid()+'.jpeg').put(payload.image)
            storageRef.on(
                'state_changed',
                snapshot => console.log(snapshot),
                error => console.log(error),
                () => {
                    storageRef.snapshot.ref.getDownloadURL().then(downloadURL => {
                        db.collection("dishes").doc(payload.dishID).update({
                            itemName: payload.name,
                            itemType: payload.type,
                            itemDescription: payload.description,
                            itemHave: payload.contain,
                            vegan: payload.vegan,
                            vegie: payload.vegie,
                            itemImage : downloadURL,
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            )
        }
    },

    createMenu ({}, payload) {
        console.log(payload)
        let docID
        db.collection('menu').doc(payload.menu.value+'s').collection(payload.menu.value).where('menuDate', '==', payload.menuDate).get()
        .then(function(querySnapshot) {
            console.log(querySnapshot.docs)
            if(querySnapshot.docs.length){
                console.log('Ecziste')
                querySnapshot.forEach(function(doc) {
                    console.log(doc.data())
                    db.collection('menu').doc(payload.menu.value+'s').collection(payload.menu.value).doc(doc.id).update({
                        menuDate: payload.menuDate,
                        items: payload.dishes
                    })
                    
                });
            }
            else{
                console.log('Non Ecziste')
                db.collection('menu').doc(payload.menu.value+'s').collection(payload.menu.value).add({
    
                })
                .then(response => {
                    docID = response.id
                    db.collection('menu').doc(payload.menu.value+'s').collection(payload.menu.value).doc(docID).update({
                        [payload.menu.value+"ID"]: docID,
                        menuDate: payload.menuDate,
                        items: payload.dishes
                    })
                })
            }
            
        })

    },

    listMenu (receivedDate) {
        const menuLunch = (state) => {
            ;
        }
        const menuBreakfast = (state) => {
            return Object.values(state.menu.lunchs || {}).filter(i => i.menuDate == receivedDate);
        }
        const menuDinner = (state) => {
            return Object.values(state.menu.lunchs || {}).filter(i => i.menuDate == receivedDate);
        }
    },
    listBreakfast (state, receivedDate) {
        return Object.values(state.menu.lunchs || {}).filter(i => i.menuDate == receivedDate)
    }

}

// ================ DATE UTILS ====================

let today = moment().format('DD/MM/YYYY');
// console.log(today);

let tomorrow = moment().add(1, 'days').format('DD/MM/YYYY');
// console.log(tomorrow);

// =================================================

// ================ GETTERS UTILS ==================


// const breakfastToday = (state) => {
//     return Object.values(state.menu.breakfasts || {}).filter(i => i.menuDate == today);
// }
// const breakfastTomorrow = (state) => {
//     return Object.values(state.menu.breakfasts || {}).filter(i => i.menuDate == tomorrow);
// }

const dishFinder = (state) => (id) => {
    return Object.values(state.dishes || {}).find(d => d.dishID == id)
}
const listBreakfast = (state) => (receivedDate) => {
    return Object.values(state.menu.breakfasts || {}).find(i => i.menuDate == receivedDate) || {};
}
const listLunch = (state) => (receivedDate) => {
    return Object.values(state.menu.lunchs || {}).find(i => i.menuDate == receivedDate) || {};
}
const listDinner = (state) => (receivedDate) => {
    return Object.values(state.menu.dinners || {}).find(i => i.menuDate == receivedDate) || {};
}

// ================================================



const getters = {
    dishes: (state) => {
        return state.dishes;
    },
    breakfastDates: (state) => {
        return state.menu2.breakfasts;
    },
    lunchDates: (state) => {
        return state.menu2.lunchs;
    },
    dinnerDates: (state) => {
        return state.menu2.dinners;
    },
    listBreakfast : listBreakfast,
    listLunch : listLunch,
    listDinner : listDinner,
    dishFinder : dishFinder,
    // breakfastToday : breakfastToday,
    // breakfastTomorrow : breakfastTomorrow,
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}