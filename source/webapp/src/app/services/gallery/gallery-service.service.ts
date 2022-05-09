import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export class Gallery {
  _id!: string;
  imageUrl!: string;
  imageTitle!: string;
  imageDesc!: string;
  uploaded!: Date;
}

const apiUrl = 'http://localhost:3000/gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleryServiceService {

  constructor(
    private http: HttpClient
  ) { }


  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
      console.error('An error occured', error.error.message );
    }
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; Please try again Later!'
    )
  }

  getGalleryById(id: string): Observable<any>{
    const url = `${apiUrl}/${id}`;
    return this.http.get<Gallery>(url).pipe(catchError(this.handleError))
  }

  addGallery(gallery: Gallery, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageTitle', gallery.imageTitle);
    formData.append('imageDesc', gallery.imageDesc);
    const header = new HttpHeaders();
    const params = new HttpParams();
    
    const options = {
      params,
      reportProgress: true,
      headers: header
    };

    const req = new HttpRequest('POST', apiUrl, formData, options);
    return this.http.request(req);
  }
}
