import {firebaseDatabase} from '../config/firebaseConfig'

export default class FirebaseService {
    static getDataList = (nodePath, callback, size = 10) => {
        let query = firebaseDatabase.ref(nodePath)
                                   .limitToLast(size)
        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val()
                item['key'] = childSnapshot.key
                items.push(item)
            })
            callback(items)
        })

        return query;
    }
    static pushData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).push();
        const id = firebaseDatabase.ref(node).push().key
        ref.set(objToSubmit)
        return id
    }
   static getCollection = async () => {
      return new Promise((resolve,reject)=>{
        firebaseDatabase.collection("leituras").get().then((docs) => {
            resolve(docs)
        })
        .catch(function(error) {
            console.error("Error adding document: ", error)
            reject(error)
        })
      })  
   }
   static getDocument = (id) => {
       return new Promise ((resolve,reject)=>{
           firebaseDatabase.collection("leituras").doc(id).get().then((doc) => {
               console.log("Document Found!")
               resolve(doc)
           }).catch(function(error) {
               console.error("Error finding document: ", error)
               reject(error)
           })
       })
   }
   static deleteCollection = (id) =>{
    firebaseDatabase.collection("leituras").doc(id).delete().then(function() {
        console.log("Document successfully deleted!")
    }).catch(function(error) {
        console.error("Error removing document: ", error)
    })
   }
   static updateDocument = (id,obj) =>{
    firebaseDatabase.collection("leituras").doc(id).update(obj).then(doc => {
        console.log(doc.data())
        console.log("Document successfully updated!")
    }).catch(function(error) {
        console.error("Error updating document: ", error)
    })
   }
   static addCollection = (obj) => {
    firebaseDatabase.collection("leituras").add(obj)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    })
}
    static remove = (id, node) => {
        return firebaseDatabase.ref(node + '/' + id).remove()
    }

}