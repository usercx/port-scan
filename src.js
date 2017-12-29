const net = require("net");
let [node, filename, host, start, end] = [...process.argv],
	result = [],
	closeNum = 0;
if(!host || !start || !end){
  console.log("参数不全！");
  process.exit();
}
if(end < start){
  [start, end] = [end, start];
}
if(start < 1){
	start = 1;
}
if(end > 65535){
	end = 65535;
}

for(let i = start; i <=end; i++){
  let item = net.connect({
  	host: host,
  	port: i
  });
  // 连接成功，可连接的端口
  item.on("connect", function(){
  	result.push(i);
  	console.log("端口：" + i + "       成功！");
  	this.destroy();
  });
  // 连接失败，不可连接的端口
  item.on("error", function(){
  	this.destroy();
  });
  // 关闭端口
  item.on("close", function(){
  });
}
