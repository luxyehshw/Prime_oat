let licenses = []; // { key, type, duration, unit, devices:[], maxDevices, startTime, status }

export default function handler(req,res){
  const { key } = req.body || {};
  if(!key) return res.json({status:"ERR",message:"NO KEY"});

  const lic = licenses.find(l=>l.key===key);
  if(!lic) return res.json({status:"ERR",message:"INVALID LICENSE"});

  // Device limit
  const deviceID = "DEVICE123"; // Demo: replace with real device id logic
  if(!lic.devices.includes(deviceID)){
    if(lic.devices.length >= lic.maxDevices) return res.json({status:"ERR",message:"DEVICE LIMIT REACHED"});
    lic.devices.push(deviceID);
  }

  // Start duration if first login
  if(!lic.startTime) lic.startTime = Date.now();

  // Expired check
  const elapsed = Date.now() - lic.startTime;
  const durationMs = lic.unit==="LIFETIM" ? lic.duration*3600*1000 : lic.duration*24*3600*1000;
  if(elapsed>durationMs){
    lic.status="EXPIRED";
    return res.json({status:"ERR",message:"LICENSE EXPIRED"});
  }

  res.json({status:"OK",message:`ACCESS GRANTED | ${lic.type} | ${lic.status}`});
}