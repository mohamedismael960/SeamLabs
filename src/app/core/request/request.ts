import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
     if(req[key] != undefined) {
      if(Array.isArray(req[key])){
        for (let i = 0; i < req[key].length; i++) {
          console.log(req[key][i]);
          options = options.append(key, req[key][i]);
        }
      }else{
        options = options.append(key, req[key]);
      }
     }
    });
  }
  return options;
};