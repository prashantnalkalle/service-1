import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipost } from '../../module/interface';
import { PostService } from '../../service/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() postObj!:Ipost
  @Output() emitremoveId:EventEmitter<string> = new EventEmitter<string>()
  constructor(
    private postservice:PostService,
    private mat_dialog:MatDialog,

  ) { }

  ngOnInit(): void {
  }

  onEdit() {
    this.postservice.editpost(this.postObj)
    window.scroll({
      top:0,
      behavior:'smooth'
    })
  }

  onRemove() {
    let config = new MatDialogConfig()
    config.width = '600px',
    config.data = `Are You Sure You Want To Remove Post With Id ${this.postObj.id} ?`

    let matdialogres = this.mat_dialog.open(GetConfirmComponent,config)

    matdialogres.afterClosed()
      .subscribe(res =>{
        if(res){
          this.postservice.removePost(this.postObj.id)
              .subscribe({
                next:res =>{
                  this.emitremoveId.emit(this.postObj.id)

                },
                error: err =>{
                  console.log(err)
                }
              })
        }
      })

    
  }


}
