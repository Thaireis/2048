import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = '2048 Game';

  numbers: any[] = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

  board: any[4][4] = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ];

  score = 0;
  gameOver = false;

  ngOnInit() {
    this.board[0][0] = this.numbers[0];
    this.board[3][1] = this.numbers[5];
    this.board[2][1] = this.numbers[5];
    this.board[1][2] = this.numbers[2];
    this.board[3][3] = this.numbers[3];
  }

  // spawnField() {
  //   let pos1 = Math.floor(Math.random() * 4);
  //   let pos2 = Math.floor(Math.random() * 4);
  //   let pos3 = Math.floor(Math.random() * 4);
  //   let pos4 = Math.floor(Math.random() * 4);
  //   let randomNum = Math.floor(Math.random() * 2);
  //   this.board[pos1][pos2] = this.numbers[randomNum];
  //   this.board[pos3][pos4] = this.numbers[randomNum];
  // }

  isMoving: boolean = true;

  moveField(event: any) {
    if (!this.gameOver) {
      if (event.key == 'w' || event.key == 'ArrowUp') {
        console.log('Input UP was sent');
        this.moveUp();
      } else if (event.key == 'a' || event.key == 'ArrowLeft') {
        console.log('Input Left was sent');
      } else if (event.key == 's' || event.key == 'ArrowDown') {
        console.log('Input Down was sent');
      } else if (event.key == 'd' || event.key == 'ArrowRight') {
        console.log('Input Right was sent');
      }
    }
  }

  moveUp() {
    if (this.isMoving == true) {
      this.rearrangeUp();
      this.isMoving = false;
    }
  }

  readCol() {
    /**
     * Lies Jede Column
     * Erstelle ArrayListe / LinkedListe
     * Lies Jedes Element
     * Gib aus
     * https://stackoverflow.com/questions/7848004/get-column-from-a-two-dimensional-array
     */

    let columnList: Array<number> = [];

    for (var x = 0; x < this.board.length; x++) {
      var column = this.board.map(function (value: any, index: any) {
        return value[x];
      });
      columnList.push(column);
    }

    console.log('Before');
    console.log(columnList[0]);
    console.log(columnList[1]);
    console.log(columnList[2]);
    console.log(columnList[3]);

    return columnList;
  }

  rearrangeUp() {
    var columnList = this.readCol();

    for (var a = 0; a < 4; a++) {
      var col: any = columnList[a];

      for (var b = 0; b < 4; b++) {
        if (col[b] > 0) {
          var tmp = col.splice(b, 1);

          //Merge 2 same numbers
          if (col[b] == tmp) {
            let d = col[b];
            d *= 2;

            col.splice(0, 4, d, '', '', '');
            console.log(col);
            break;
            //Normal
          } else {
            col.splice(0, 0, tmp[0]);
            break;
          }
        }
      }
    }
    console.log('new Columns');
    console.log(columnList[0]);
    console.log(columnList[1]);
    console.log(columnList[2]);
    console.log(columnList[3]);
    console.log('----------------');

    this.updateBoard(columnList);
  }

  updateBoard(columnList: any) {
    let newBoard = [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ];

    for (let i = 0; i < columnList.length; i++) {
      for (let a = 0; a < columnList.length; a++) {
        // columnList[0] = this.numbers[0];
        // columnList[1] = this.numbers[6];
        // columnList[2] = this.numbers[2];
        // columnList[3] = this.numbers[3];
        newBoard[a][i] = columnList[i];
        break;
      }
    }
    this.board = newBoard;
  }

  color(index: number) {
    switch (index) {
      case 2:
        return '#eee4da';
      case 4:
        return '#eee1c9';
      case 8:
        return '#f3b27a';
      case 16:
        return '#f69664';
      case 32:
        return '#f77c5f';
      case 64:
        return '#f75f3b';
      case 128:
        return '#edd073';
      case 256:
        return '#edcc62';
      case 512:
        return '#eb62ed';
      case 1024:
        return '#9e62ed';
      case 2048:
        return '#6286ed';
      default:
        return;
    }
  }
}
