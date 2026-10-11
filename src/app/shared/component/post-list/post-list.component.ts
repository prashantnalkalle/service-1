import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ipost } from '../../module/interface';
import { PostService } from '../../service/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  @Input() postObj!:Ipost
  @Output() emitremoveId:EventEmitter<string> = new EventEmitter<string>()
  @Output() emiteditId:EventEmitter<string> = new EventEmitter<string>()
  @Input() editId:string | null = null
  constructor(
    private postservice:PostService,
    private mat_dialog:MatDialog,
    private snackbar:SnackbarService

  ) { }

  ngOnInit(): void {
  }

  onEdit() {
    if (this.editId !== null) {
      this.snackbar.opensnackbar(`Please complete the update process`)
      return
    }

    this.emiteditId.emit(this.postObj.id)
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
