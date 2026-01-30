let licenses = []; // shared with login.js

export default function handler(req,res){
  const { type="FREE","VIP",duration=3,unit="DAYS",maxDevices=2 } = req.body || {};
  const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let key="CODM-";
  for(let i=0;i<6;i++) key+=chars[Math.floor(Math.random()*chars.length)];

  licenses.push({key,type,duration,unit,maxDevices,devices:[],startTime:null,status:"ACTIVE"});
  res.json({status:"OK",license:key});
}