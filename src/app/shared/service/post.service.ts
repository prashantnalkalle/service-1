import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost, Ipostres, Iresp } from '../module/interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  base_url = environment.BASE_URL
  post_url = `${this.base_url}/posts.json`

  constructor(private _http:HttpClient) { }

  private editObj$:Subject<Ipost> = new Subject

  ediobjObs:Observable<Ipost> = this.editObj$.asObservable()

  editpost(post:Ipost) {
    this.editObj$.next(post)
  }

  fetchposts():Observable<Ipostres> {

    return this._http.get<Ipostres>(this.post_url)
  }

  createpost(post:Ipost) : Observable<Iresp> {
    return this._http.post<Iresp>(this.post_url,post)
  }

  UpdatePost(post:Ipost) :Observable<Ipost> {
    let updateUrl = `${this.base_url}/posts/${post.id}.json`
    return this._http.put<Ipost>(updateUrl,post)
  }

  removePost(id:string):Observable<any> {
    let removeUrl = `${this.base_url}/posts/${id}.json`
    return this._http.delete(removeUrl)
  }
}
