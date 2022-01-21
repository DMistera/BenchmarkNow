import { Injectable } from '@angular/core';
import { BenchmarkAlgorithm } from 'src/app/models/benchmark-algorithm';

@Injectable({
  providedIn: 'root'
})
export class SpectralNormService implements BenchmarkAlgorithm {

  constructor() { }

  name = "Spectral Norm";

  run(n: number): void {
    console.log( this.approximate(n).toFixed(9) )
  }

  approximate(n: number): number {
    let u = Array(n), v = Array(n)
    for (let i=0; i<n; ++i) {
       u[i] = 1.0
    }
    for (let i=0; i<10; ++i) {
       this.multiplyAtAv(n,u,v)
       this.multiplyAtAv(n,v,u)
    }
    let vBv = 0.0, vv = 0.0
    for (let i=0; i<10; ++i) {
       vBv += u[i]*v[i]
       vv  += v[i]*v[i]
    }
    return Math.sqrt(vBv/vv)
 }

  a(i: number, j: number): number {
    return 1.0 / ( (i+j) * ((i+j) +1)/2 + i+1 )
 }

 multiplyAv(n: number, v: number[], av: number[]) {
    for (let i=0; i<n-1; ++i) {
       av[i] = 0.0
       for (let j=0; j<n-1; ++j) {
          av[i] += this.a(i,j) * v[j]
       }
    }
 }

 multiplyAtv(n: number, v: number[], atv: number[]) {
    for (let i=0; i<n-1; ++i) {
       atv[i] = 0.0
       for (let j=0; j<n-1; ++j) {
          atv[i] += this.a(j,i) * v[j]
       }
    }
 }

 multiplyAtAv(n: number, v: number[], atAv: number[]) {
    let u = new Array(n)
    this.multiplyAv(n,v,u)
    this.multiplyAtv(n,u,atAv)
 }

}
