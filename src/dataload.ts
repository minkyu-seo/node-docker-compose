const DataLoader = require('dataloader');

// fake data
const posts = [
  { id: 1, title: 'test1' },
  { id: 2, title: 'test2' },
  { id: 3, title: 'test3' },
  { id: 4, title: 'test4' },
  { id: 5, title: 'test5' },
];

// fake db operation
const findAllPosts = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(posts);
  }, 100);
});

// batchLoadFn 의 결과는 promise여야 한다.
const batchLoadFn = async (keys: any) => {
  const results: any = await findAllPosts();
  console.log('keys', keys);
  // db 에서 받아온 결과를 요청온 key에 mapping
  return keys.map((k: any) => results.find((p: { id: any; }) => p.id === k));
};

const postLoader = new DataLoader(batchLoadFn);

// tick 1
postLoader.load(1).then(console.log);
postLoader.load(2).then(console.log);

// tick 2
setTimeout(() => {
  postLoader.load(3).then(console.log);
  postLoader.load(4).then(console.log);
}, 1000);
