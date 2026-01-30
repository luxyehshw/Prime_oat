let balances={creator:Infinity,reseller:100};

export default function handler(req,res){
  res.json({balances});
}