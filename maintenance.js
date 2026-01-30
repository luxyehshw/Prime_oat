let maintenance={active:false,message:""};

export default function handler(req,res){
  res.json({status:maintenance.active?"MAINTENANCE":"OK",message:maintenance.message});
}