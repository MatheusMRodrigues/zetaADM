import Vue from "vue"
import moment from "moment"
import { firestoreAction } from 'vuexfire'
import { db, storage } from 'boot/firebase'
import {uid} from "quasar"


const state ={

    dishes: {}

}

const mutations = {

}

// =============== CONVERT UTILS =================

const objToArray = obj => Object.values(obj);

const objToArrayWithKey = (obj) => Object.keys(obj).map(key => [key, obj[key]]);

// ===============================================

const actions = {

    // ================ DATABASE BINDS ==================

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
                        db.collection("dishes").doc(docID).delete()
                    })
                }
            )
        })
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

// const dishFinder = (state) => (id) => {
//     return Object.values(state.dishes || {}).find(d => d.dishID == id)
// }

// ================================================

const getters = {
    dishes: (state) => {
        return state.dishes;
    },
    // dishFinder : dishFinder,
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