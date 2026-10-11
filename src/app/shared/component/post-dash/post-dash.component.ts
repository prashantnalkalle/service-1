import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { Ipost } from '../../module/interface';
import { SnackbarService } from '../../service/snackbar.service';

@Component({
  selector: 'app-post-dash',
  templateUrl: './post-dash.component.html',
  styleUrls: ['./post-dash.component.scss']
})
export class PostDashComponent implements OnInit {
  postArr:Ipost[] =[]
  constructor(
    private postservice:PostService,
    private snakbar:SnackbarService
  ) { }

  ngOnInit(): void {
    this.getposts()
  }

  getposts() {
    this.postservice.fetchposts()
      .subscribe({
        next : res =>{
          for (const key in res) {
            this.postArr.push({...res[key],id:key})
          }
        },
        error:err =>{
          this.snakbar.opensnackbar(err)
        }
      })
  }

  onAddpost(post:Ipost) {
    this.postArr.unshift(post)
    this.snakbar.opensnackbar(`The New Post With Id ${post.id} Is Added Successfully!!`)

  }

  onUpdatepost(post:Ipost) {
    let getindex = this.postArr.findIndex(ele => ele.id === post.id)
    this.postArr[getindex] = post
    this.snakbar.opensnackbar(`The Post With Id ${post.id} Is Updated Successfully!!`)

  }

  onRemove(id:string) {
    let getindex = this.postArr.findIndex(ele =>ele.id === id)
    this.postArr.splice(getindex,1)
    this.snakbar.opensnackbar(`The Post With Id ${id} Is Removed Successfully!!`)
  }

}
