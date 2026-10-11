import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { Ipost } from '../../module/interface';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  iseditmode : boolean = false
  editpost!:Ipost
  @ViewChild('postform') postform !:NgForm
  @Output() emitnewobj:EventEmitter<Ipost> = new EventEmitter<Ipost>()
  @Output() emitupdateObj:EventEmitter<Ipost> = new EventEmitter<Ipost>()

  constructor(
    private postservice:PostService,
    private snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
    this.postservice.ediobjObs
      .subscribe(res=>{
        if(res) {
          this.editpost = res
          this.iseditmode = true
          this.postform.form.patchValue(res)
        }
      })

  }

  onSubmit(){
    if(this.postform.valid) {
      let newObj:Ipost = this.postform.form.value
      this.postservice.createpost(newObj)
        .subscribe({
          next:res=>{
            newObj.id = res.name
            this.postform.form.reset()
            this.emitnewobj.emit(newObj)
          },
          error:err =>{
            this.snackbar.opensnackbar(err)
          }
        })
    }else{
      this.snackbar.opensnackbar(`Please Fill All The Fields!!`)
    }

  }

  onUpdate(){
    if(this.postform.valid){
      let updateObj :Ipost = {...this.postform.form.value,id:this.editpost.id}
      this.postservice.UpdatePost(updateObj)
        .subscribe({
          next : res=>{
            this.iseditmode = false
            this.emitupdateObj.emit(res)
            this.postform.form.reset()
          },
          error : err =>{
            this.snackbar.opensnackbar(err)

          }
        })
    }else{
      this.snackbar.opensnackbar(`Please Fill All The Fields!!`)
    }
  }

}
