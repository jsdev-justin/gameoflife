var container = document.querySelector(".container")
var tiles = []

function buildGrid(){
    for(let i=0;i<20;i++){
        let row = []
        for(let j=0;j<20;j++){
            var divTile = document.createElement("div");
            divTile.className="tile";
            if(Math.random() > .70){
                divTile.classList.add("populate")
            }
            divTile.onclick=(e)=>e.target.classList.toggle("populate")
            container.append(divTile)
            row.push(divTile)
        }
        tiles.push(row)
    }
}


buildGrid()
// setInterval(()=>{
// console.log(tiles[1][5])
// },2000);


function runSimulation(){

    // console.log("run simulation")

    for(let i=0;i<20;i++){
        for(let j=0;j<20;j++){
            let neighbors =[
                [1,1],
                [1,-1],
                [-1,1],
                [-1,-1],
                [0,1],
                [0,-1],
                [1,0],
                [-1,0],
            ]
            let neighborCount = 0;

            neighbors.forEach(n=>{
                // if(i === 0 && j === 0)return;
                // if(i === 0 && n[1] === -1)return;
                // if(j === 0 && n[0] === -1)return;
                // if(i === 19 && n[1] === 1)return;
                // if(j === 19 && n[0] === 1)return;
                // if(!tiles[i + n[0]][j + n[1]]){
                //     console.log('doesnt exist');
                //     return;
                // }
            
                let newI = n[0] + i;
                let newJ = n[1] + j;
                if(newI < 0 || newI > 19 || newJ < 0 || newJ > 19){
                    console.log('out of bounds');
                    // return;
                }
                else if(tiles[newI][newJ].classList.contains('populate')){
                    neighborCount++
                }
            })
                // console.log("NeighborCount: " + neighborCount)



                if(neighborCount > 3 || neighborCount < 2 && tiles[i][j].classList.contains("populate")){
                    tiles[i][j].classList.remove('populate')
                }
                if(neighborCount  === 3 && !tiles[i][j].classList.contains("populate")){
                    console.log("populate")
                    tiles[i][j].classList.add('populate')
                }
             
        }

    }


    // setTimeout(runSimulation,2000)
}


var isRunning = false;
let simInterval = ""

document.querySelector(".start-btn").onclick=(e)=>{
    if(!isRunning){
  simInterval = setInterval(()=>{ runSimulation()},2000);
   isRunning = true;
   e.target.innerHTML = "STOP"
    }
    else{
        isRunning = true;
        e.target.innerHTML = "START"
        console.log("already running");
        clearInterval(simInterval)
        return;
    }
}