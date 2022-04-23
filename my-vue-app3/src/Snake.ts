export class Snake {
    plane : number[][]
    height:number
    width:number
    head_position : number[]
    direction : number
    segments : number
    constructor(position_x:number, position_y:number, height: number, width: number) {
      this.plane = []
      this.head_position = [position_x, position_y]
      this.height = height
      this.width = width
      this.direction = 1
      this.segments = 0
      for(let i = 0 ; i < height; i++){
        this.plane[i] = []
        for(let j = 0 ; j < width ; j++){
          this.plane[i][j] = 0
        }
      }
    }
  }