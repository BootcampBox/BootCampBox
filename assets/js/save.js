// $('#saveBtn').on('click', function() {
//   console.log('save fired')
//   console.log(auth.currentUser.uid)
//
//   let lsSnippets = JSON.parse(localStorage.getItem('snippets'));
//   let lsLinks = JSON.parse(localStorage.getItem('links'));
//   let userID = auth.currentUser.uid;
//
//   fireStore.collection('users').doc(userID).get().then((doc) => {
//     console.log(doc.data().snippets);
//     var links = doc.data().links;
//     var snips = doc.data().snippets;
//     return snips && links;
//   }).then(function(snips, links) {
//     fireStore.collection('users')
//       .doc(userID.snippets)
//       .set(lsSnippets);
//     fireStore.collection('users')
//       .doc(userID.links)
//       .set(lsLinks);
//     console.log(fireStore.collection('users').doc(userID));
//   })
// });