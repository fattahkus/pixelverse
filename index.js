import fs from "fs";
import fetch from "node-fetch";
import crypto from 'crypto'
import delay from "delay";
import moment from 'moment';
import { Twisters } from "twisters";
import { setTimeout } from 'timers/promises';


const userAgentGenerator = {
  edge: function () {
      const edgeVersion = Math.floor(Math.random() * 100) + 90;
      const chromeVersion = Math.floor(Math.random() * 100) + 96;
      const safariVersion = Math.floor(Math.random() * 100) + 10;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = os.platform() === 'win32' ? 'Windows NT 10.0; Win64; x64' : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Safari/${webkitVersion}.36 Edg/${edgeVersion}.0.1901.203`;
      return userAgent;
  },
  chrome: function () {
      const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
      const chromeVersion = Math.floor(Math.random() * 100) + 96;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = os.platform() === 'win32' ? `Windows NT ${windowsNtVersion}.0; Win64; x64` : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.3163.100 Safari/${webkitVersion}.36`;
      return userAgent;
  },
  firefox: function () {
      const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
      const firefoxVersion = Math.floor(Math.random() * 26) + 95;
      const geckoVersion = Math.floor(Math.random() * 30) + 20100101;
      const osPlatform = os.platform() === 'win32' ? `Windows NT ${windowsNtVersion}.0; Win64; x64` : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}; rv: ${firefoxVersion}.0) Gecko/${geckoVersion} Firefox/${firefoxVersion}.0`;
      return userAgent;
  },
  safari: function () {
      const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
      const safariVersion = Math.floor(Math.random() * 100) + 10;
      const webkitVersion = Math.floor(Math.random() * 100) + 500;
      const osPlatform = os.platform() === 'win32' ? `Windows NT ${windowsNtVersion}.0; Win64; x64` : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.1.15 (KHTML, like Gecko) Version/${safariVersion}.1.15 Safari/${webkitVersion}.1.15`;
      return userAgent;
  },
  android: function () {
      const edgeVersion = Math.floor(Math.random() * 25) + 90;
      const androidVersion = Math.floor(Math.random() * 8) + 5;
      const chromeVersion = Math.floor(Math.random() * 20) + 96;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = Math.floor(Math.random() * 10)
      const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersion}.${osPlatform}; K) AppleWebKit/5${webkitVersion}37.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Mobile Safari/${webkitVersion}.36 EdgA/${edgeVersion}.0.1901.196`
      return userAgent;
  },
  ios: function () {
      const iosVersion = Math.floor(Math.random() * 8) + 9;
      const edgeVersion = Math.floor(Math.random() * 25) + 90;
      const safariVersion = Math.floor(Math.random() * 6) + 10;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = Math.floor(Math.random() * 10)
      const userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS ${iosVersion}_${osPlatform} like Mac OS X) AppleWebKit/${webkitVersion}.1.15 (KHTML, like Gecko) EdgiOS/${edgeVersion}.0.1901.187 Version/${safariVersion}.0 Mobile/15E148 Safari/${webkitVersion}.1`
      return userAgent;
  }
};

const getServer = (query,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch("https://api-clicker.pixelverse.xyz/api/health", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": "W/\"14-9C3mA401Tth5/w8uIkMUtc46viM\"",
        "initdata": query,
        "priority": "u=1, i",
        "sec-ch-ua": randomUserAgent,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "Referer": "https://sexyzbot.pxlvrs.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "GET"
    })
      .then((res) => res.clone().json().catch(() => res.text()))
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

const UserDetails = (query,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch("https://api-clicker.pixelverse.xyz/api/users", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": "W/\"1a4-9MFqxKKN56Dl5l334+zHsaLLNwo\"",
        "initdata": query,
        "priority": "u=1, i",
        "sec-ch-ua": randomUserAgent,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "Referer": "https://sexyzbot.pxlvrs.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "GET"
    })
    .then((res) => res.json())
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
  });

const getTaskList = (query,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://api-clicker.pixelverse.xyz/api/tasks/my", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "if-none-match": "W/\"750-JFh1JmhcKcTE6nL0GETPxG4KJI4\"",
          "initdata": query,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "Referer": "https://sexyzbot.pxlvrs.io/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: null,
        method: "GET"
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const startTaskList = (query,taskId,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch(`https://api-clicker.pixelverse.xyz/api/tasks/start/${taskId}`, {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "initdata": query,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "Referer": "https://sexyzbot.pxlvrs.io/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: null,
        method: "POST"
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const claimTaskList = (query,taskId,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch(`https://api-clicker.pixelverse.xyz/api/user-tasks/${taskId}/check`, {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "initdata": query,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "Referer": "https://sexyzbot.pxlvrs.io/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: null,
        method: "GET"
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const getMining = (query,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://api-clicker.pixelverse.xyz/api/mining/progress", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "if-none-match": "W/\"aa-6XbRLwez1Suvp/aIbwIgF9F0L7s\"",
          "initdata": query,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "Referer": "https://sexyzbot.pxlvrs.io/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: null,
        method: "GET"
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const claimMining = (query,randomUserAgent) =>
    new Promise((resolve, reject) => {
      fetch("https://api-clicker.pixelverse.xyz/api/mining/claim", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
          "initdata": query,
          "priority": "u=1, i",
          "sec-ch-ua": randomUserAgent,
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "Referer": "https://sexyzbot.pxlvrs.io/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: null,
        method: "POST"
      })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  
const getDailyReward = (query,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch("https://api-clicker.pixelverse.xyz/api/daily-rewards", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
        "if-none-match": "W/\"118-TqN23wrHQ/agnMXStXpevzFg36A\"",
        "initdata": query,
        "priority": "u=1, i",
        "sec-ch-ua": randomUserAgent,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "Referer": "https://sexyzbot.pxlvrs.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "GET"
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  
const claimDailyReward = (query,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch("https://api-clicker.pixelverse.xyz/api/daily-rewards/claim", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
        "initdata": query,
        "priority": "u=1, i",
        "sec-ch-ua": randomUserAgent,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "Referer": "https://sexyzbot.pxlvrs.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "POST"
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  
const getDailyCombo = (query,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch("https://api-clicker.pixelverse.xyz/api/cypher-games/current", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "if-none-match": "W/\"8d7-UrMl95fYh60d3QF6gRUp9uMzekI\"",
        "initdata": query,
        "priority": "u=1, i",
        "sec-ch-ua": randomUserAgent,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "Referer": "https://sexyzbot.pxlvrs.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "GET"
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  
const claimDailyCombo = (query,comboId,combo_0,combo_1,combo_2,combo_3,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch(`https://api-clicker.pixelverse.xyz/api/cypher-games/${comboId}/answer`, {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
        "content-type": "application/json",
        "initdata": query,
        "priority": "u=1, i",
        "sec-ch-ua": randomUserAgent,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "Referer": "https://sexyzbot.pxlvrs.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: `{\"${combo_0}\":0,\"${combo_1}\":1,\"${combo_2}\":2,\"${combo_3}\":3}`,
      method: "POST"
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  
const buyRandomPets = (query,tgId,secretId,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch(`https://api-clicker.pixelverse.xyz/api/pets/buy?tg-id=${tgId}&secret=${secretId}`, {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
        "content-type": "application/json",
        "initdata": query,
        "priority": "u=1, i",
        "sec-ch-ua": randomUserAgent,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "Referer": "https://sexyzbot.pxlvrs.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: "{}",
      method: "POST"
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
  
const getPets = (query,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch("https://api-clicker.pixelverse.xyz/api/pets", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
        "initdata": query,
        "priority": "u=1, i",
        "sec-ch-ua": randomUserAgent,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "Referer": "https://sexyzbot.pxlvrs.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "GET"
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

const upLevelPets = (query,petsId,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch(`https://api-clicker.pixelverse.xyz/api/pets/user-pets/${petsId}/level-up`, {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,id;q=0.8,vi;q=0.7",
        "initdata": query,
        "priority": "u=1, i",
        "sec-ch-ua": randomUserAgent,
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "Referer": "https://sexyzbot.pxlvrs.io/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
      method: "POST"
    })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

  function getSecretId(tgId) {
    var secret = "adwawdasfajfklasjglrejnoierjboivrevioreboidwa";
    var secretId = crypto.createHmac("sha256", secret).update(tgId, 'utf-8').digest('hex');
    return secretId
  }
  const readFileToJSON = (path) => {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  };
(async () => {
  const queryList = readFileToJSON("./pixel.json");
  const twisters = new Twisters();
  let idTask;
  let statusTask;
  let titleTask;
  let typeTask;
  let idPets;
  let namePets;
  let levelPets;
  let isMaxLevel;
  let upPrice;
  let upAt;
  let claimTaskLists;

    while (true) {
      await Promise.all(
          queryList.map(async (query) => {
            try{
              const randomUserAgent = userAgentGenerator.ios();
              const detailsUser = await UserDetails(query,randomUserAgent)
              // console.log("detailsUser :",detailsUser)
                if(detailsUser.updatedAt){
                  // console.log(detailsUser)
                  const tgId = detailsUser.telegramUserId
                  const getSecretIds = getSecretId(tgId);
                  var username = detailsUser.username
                  const getUserAmount = (detailsUser.clicksCount).toFixed(0)
                  // console.log(getSecretIds)
          
                          const getTaskLists = await getTaskList(query,randomUserAgent)
                          // console.log("getTaskLists :",getTaskLists)
                          if(!getTaskLists.message){
                            const availableTaskData = getTaskLists.available
                            const inProgressTaskData = getTaskLists.inProgress
                            const doneTaskData = getTaskLists.done
                            
                            availableTaskData.forEach(async (element) => {
                              if(element){
                                idTask = element.id
                                statusTask = element.taskStatus
                                titleTask = element.title
                                typeTask = element.type
                                  if(typeTask !== 'SNAPSHOT'){
                                    if(statusTask === 'ACTIVE'){
                                      const startTaskLists = await startTaskList(query,idTask,randomUserAgent)
                                      if(!startTaskLists.message){
                                        twisters.put(username, {
                                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | Start Task : ${idTask} | ${titleTask} | ${startTaskLists.status}`});
                                          if(startTaskLists.status === 'IN_PROGRESS'){
                                            claimTaskLists = await claimTaskList(query,startTaskLists.userTaskId,randomUserAgent)
                                            if(!claimTaskLists.message){
                                              twisters.put(username, {
                                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | Claim Task : ${idTask} | ${titleTask} | ${claimTaskLists.status}`});
                                            }else{
                                              twisters.put(username, {
                                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | claimTaskLists : ${claimTaskLists.message}`});
                                            }
                                          }else{
                                            twisters.put(username, {
                                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | startTaskLists : ${startTaskLists.message}`});
                                          }
                                      }
                                    }
                                  }
                              }
                            })
            
                            inProgressTaskData.forEach(async (element) => {
                              if(element){
                                idTask = element.userTaskId
                                statusTask = element.status
                                titleTask = element.title
                                typeTask = element.type
                                if(typeTask !== 'SNAPSHOT'){
                                  if(statusTask === 'IN_PROGRESS'){
                                        claimTaskLists = await claimTaskList(query,idTask,randomUserAgent)
                                        if(!claimTaskLists.message){
                                          if(claimTaskLists.status === 'DONE'){
                                            twisters.put(username, {
                                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | Claim Task : ${idTask} | ${titleTask} | ${claimTaskLists.status}`});
                                          }
                                        }else{
                                          twisters.put(username, {
                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | claimTaskLists : ${claimTaskLists.message}`});
                                        }
                                  }
                                }
                              }
                            })
            
                            // doneTaskData.forEach(async (element) => {
                            //   if(element){
                            //   idTask = element.userTaskId
                            //   statusTask = element.status
                            //   titleTask = element.title
                            //   typeTask = element.type
                            //       if(statusTask === 'DONE'){
                            //               console.log(`Finished Task : idTask ${idTask} | titleTask ${titleTask} | Status ${statusTask}`)
                            //       }
                            //   }
                            // })
    
                          }else{
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | getTaskLists : ${getTaskLists.message}`});
                          }
          
                          const getMinigs = await getMining(query,randomUserAgent)
                          if(!getMinigs.message){
                            if(getMinigs.currentlyAvailable === getMinigs.maxAvailable){
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | Available mining amount : ${getMinigs.currentlyAvailable.toFixed(0)}/${getMinigs.maxAvailable}, Trying to claim...`});
                              // console.log(`Available Minings : ${getMinigs.maxAvailable}`)
                              const claimMinings = await claimMining(query,randomUserAgent)
                              if(!claimMinings.message){
                                if(claimMinings.currentlyAvailable == 0){
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | Success claim minings amount : ${claimMinings.claimedAmount}`});
                                }
                              }else{
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | claimMinings : ${claimMinings.message}`});
                              }
                            }else{
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | Available mining amount : ${getMinigs.currentlyAvailable.toFixed(0)}/${getMinigs.maxAvailable}, not time to claim...`});
                            }
                          }else{
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | getMinigs : ${getMinigs.message}`});
                          }
          
                          const claimDailyRewards = await claimDailyReward(query,randomUserAgent)
                            if(!claimDailyRewards.message){
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | Daily rewards claim : day ${claimDailyRewards.day} id ${claimDailyRewards.id} rewards amount ${claimDailyRewards.amount}`});
                            }else{
                              twisters.put(username, {
                                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | claimDailyRewards : ${claimDailyRewards.message}`});
                            }
          
                          const getDailyCombos = await getDailyCombo(query,randomUserAgent)
                          if(!getDailyCombos.message){
                              if(getDailyCombos.status === 'ACTIVE'){
                                  if(getDailyCombos.availableOptions && getDailyCombos.availableOptions.length > 4){
                                    let combo_0; let combo_1; let combo_2; let combo_3;var arr = [];
                                    while(arr.length < 4){
                                        var r = Math.floor(Math.random() * getDailyCombos.availableOptions.length-1) + 1;
                                        if(arr.indexOf(r) === -1) arr.push(r);
                                    }
                                    do{
                                      combo_0 = getDailyCombos.availableOptions[arr[0]].id ?? ''
                                      combo_1 = getDailyCombos.availableOptions[arr[1]].id ?? ''
                                      combo_2 = getDailyCombos.availableOptions[arr[2]].id ?? ''
                                      combo_3 = getDailyCombos.availableOptions[arr[3]].id ?? ''
                                    }while(!combo_0&&!combo_1&&!combo_2&&!combo_3)

                                    if(combo_0 && combo_1 && combo_2 && combo_3 && getDailyCombos.id){
                                      // console.log(`[${username}] | Trying get pets combo [from max : ${getDailyCombos.availableOptions.length}] : combo_0[${combo_0}] combo_1[${combo_1}] combo_2[${combo_2}] combo_3[${combo_3}]`)
                                      twisters.put(username, {
                                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | Trying get pets combo [from max : ${getDailyCombos.availableOptions.length}] : combo_0[${combo_0}] combo_1[${combo_1}] combo_2[${combo_2}] combo_3[${combo_3}]`});
    
                                        const claimDailyCombos = await claimDailyCombo(query,getDailyCombos.id,combo_0,combo_1,combo_2,combo_3,randomUserAgent)
                                        if(!claimDailyCombos.message){
                                          // console.log(`[${username}] | Claim daily combo : comboId ${claimDailyCombos.id} Percent ${claimDailyCombos.rewardPercent} Rewards Amount ${claimDailyCombos.rewardAmount}`)
                                            twisters.put(username, {
                                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | Claim daily combo : comboId ${claimDailyCombos.id} Percent ${claimDailyCombos.rewardPercent} Rewards Amount ${claimDailyCombos.rewardAmount}`});
                                        }else{
                                          // console.log(`[${username}] | claimDailyCombos : ${claimDailyCombos.message}`)
                                          twisters.put(username, {
                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | claimDailyCombos : ${claimDailyCombos.message}`});
                                        }
                                    }else{
                                      // console.log(`[${username}] | some combo options are not available...`)
                                      twisters.put(username, {
                                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | some combo options are not available...`});
                                    }
                                  }
                              }else{
                                // console.log(`getDailyCombos  [${username}] :`,getDailyCombos.status)
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | getDailyCombos : ${getDailyCombos.message}`});
                              }
                          }else{
                            // console.log(`getDailyCombos  [${username}] :`,getDailyCombos.message)
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | getDailyCombos : ${getDailyCombos.message}`});
                          }
          
                          const getPetss = await getPets(query,randomUserAgent)
                          if(!getPetss.message){
                            if(getUserAmount > getPetss.buyPrice){
                              const buyRandomPetss = await buyRandomPets(query,tgId,getSecretIds,randomUserAgent)
                              if(!buyRandomPetss.message){
                                if(buyRandomPetss.id){
                                  twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | Trying buy random pets : petsId ${buyRandomPetss.pet.id} petsName ${buyRandomPetss.pet.name} boughtAt ${buyRandomPetss.createdAt}`});
                                }
                              }else{
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | buyRandomPetss : ${buyRandomPetss.message}`});
                              }
                            }
                            
                            const totalPets = getPetss.data.length
                            const petsData = getPetss.data
                            // console.log("petsData :",petsData)
                            petsData.forEach(async (element) => {
                              // console.log(getUserAmount)
                              if(element){
                                idPets = element.userPet.id
                                namePets = element.name
                                levelPets = element.userPet.level
                                isMaxLevel = element.userPet.isMaxLevel
                                upPrice = element.userPet.levelUpPrice
                                upAt = element.userPet.levelUppedAt
                                if(element.userPet.isMaxLevel === false){
                                  // twisters.put(username, {
                                  //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${getUserAmount} | Pets user : petsId ${element.userPet.id} petsName ${element.name} upPrice ${element.userPet.levelUpPrice}`});
                                  if(getUserAmount >= element.userPet.levelUpPrice){
                                    const upLevelPetss = await upLevelPets(query,element.userPet.id,randomUserAgent)
                                    if(!upLevelPetss.message){
                                      // console.log(upLevelPetss)
                                        if(upLevelPetss.levelUppedAt){
                                          twisters.put(username, {
                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${getUserAmount} | Pets user : petsId ${element.userPet.id} petsName ${element.name} petsLevel ${upLevelPetss.level} upPrice ${element.userPet.levelUpPrice} upAt ${upLevelPetss.levelUppedAt}`});
                                        }else{
                                          twisters.put(username, {
                                            text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${getUserAmount} | Pets user : petsId ${element.userPet.id} petsName ${element.name} petsLevel ${element.userPet.level} upPrice ${element.userPet.levelUpPrice}, message ${upLevelPetss.message}...`});
                                        }
                                    }else{
                                      twisters.put(username, {
                                        text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | upLevelPetss : ${upLevelPetss.message}`});
                                    }
                                  }else{
                                    // twisters.put(username, {
                                    //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance : ${getUserAmount} | Pets user : petsId ${element.userPet.id} petsName ${element.name} petsLevel ${element.userPet.level} upPrice ${element.userPet.levelUpPrice}, Don't have enought coins to upgrade...`});
                                  }
                                }
                              }
                            })
                          }else{
                            twisters.put(username, {
                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] Main Balance :  ${getUserAmount} | getPetss : ${getPetss.message}`});
                          }
                }else{
                  // console.log(`[${username}] | Failed fetch to server...`)
                  twisters.put(username, {
                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] | Failed fetch to server...`});
                }
            } catch (e) {
              // console.log(`[${username}] | error ${e}...`)
              twisters.put(username, {
                text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] | Interval Server Error : ${e}...`});
                // twisters.put(username, {
                //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] | Interval Server Error`});
            }

          })
      )
    }
})();