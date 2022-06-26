import { AppError } from './app-error';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';



export class ErroUtil {
  public static handleError(error: HttpErrorResponse) {
    console.log('handleError');
    let errorMessage = '';
    console.log(error);
    if (error.status === 0) {
      //if (error instanceof Error || error instanceof ErrorEvent) {
      console.error('cliente');
      errorMessage =
        error instanceof AppError
          ? error.message
          : 'Opsss! Um problema inesperado aconteceu!';
    } else {
      console.error('servidor');
      errorMessage = ErroUtil.getServerErrorMessage(error);
    }


    return throwError(new Error(errorMessage));


  }

  private static getServerErrorMessage(error: HttpErrorResponse) {
    switch (error.status) {
      case 404: {
        return `O recurso informado não foi encontrado!`;
      }
      case 403: {
        return `O acesso foi negado!`;
      }
      case 500: {
        return `Oppsss! Consulta a Fabiula!`;
      }
      default: {
        return `Oppsss! Um erro inesperado aconteceu! Consulta a Fabiula!`;
      }
    }
  }
}
