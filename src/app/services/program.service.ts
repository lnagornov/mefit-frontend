import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

import {Program} from "../models/program.model";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private _programs: Program[] = [];
  private _currentProgram?: Program;
  private _error: string = "";
  private _loading: boolean = false;

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  get programs(): Program[] {
    return this._programs;
  }

  get currentProgram(): Program | undefined {
    return this._currentProgram;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  getAllPrograms(): void {
    if (this._loading) {
      return;
    }

    this._loading = true;

    this.http.get<Program[]>(environment.backend_api_url_programs).subscribe({
      next: (programs: Program[]) => {
        this._programs = programs;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this._error = error.message;
      },
      complete: () => {
        this._loading = false;
      },
    });
  }

  getProgramById(id: number) {
    if (this._loading) {
      return;
    }

    this._loading = true;

    this.http.get<Program>(environment.backend_api_url_programs + id).subscribe({
      next: (program: Program) => {
        this._currentProgram = program;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this._error = error.message;
      },
      complete: () => {
        this._loading = false;
      },
    });
  }
}
