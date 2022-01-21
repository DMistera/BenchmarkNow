import { Injectable } from '@angular/core';
import { BenchmarkAlgorithm } from 'src/app/models/benchmark-algorithm';
import { BenchmarkService } from '../benchmark.service';

@Injectable({
  providedIn: 'root'
})
export class FastaService implements BenchmarkAlgorithm {

  constructor() { }

  last = 42
  A = 3877
  C = 29573
  M = 139968;

  name = "Fasta";

  run(n: number): void {

    this.last = 42
    this.A = 3877
    this.C = 29573
    this.M = 139968;

    console.log(">ONE Homo sapiens alu")
    this.fastaRepeat(2 * n, this.ALU)

    console.log(">TWO IUB ambiguity codes")
    this.fastaRandom(3 * n, this.IUB)

    console.log(">THREE Homo sapiens frequency")
    this.fastaRandom(5 * n, this.HomoSap)
  }

  rand(max: number) {
    this.last = (this.last * this.A + this.C) % this.M;
    return max * this.last / this.M;
  }

  ALU =
    "GGCCGGGCGCGGTGGCTCACGCCTGTAATCCCAGCACTTTGG" +
    "GAGGCCGAGGCGGGCGGATCACCTGAGGTCAGGAGTTCGAGA" +
    "CCAGCCTGGCCAACATGGTGAAACCCCGTCTCTACTAAAAAT" +
    "ACAAAAATTAGCCGGGCGTGGTGGCGCGCGCCTGTAATCCCA" +
    "GCTACTCGGGAGGCTGAGGCAGGAGAATCGCTTGAACCCGGG" +
    "AGGCGGAGGTTGCAGTGAGCCGAGATCGCGCCACTGCACTCC" +
    "AGCCTGGGCGACAGAGCGAGACTCCGTCTCAAAAA";

  IUB = {
    a: 0.27, c: 0.12, g: 0.12, t: 0.27,
    B: 0.02, D: 0.02, H: 0.02, K: 0.02,
    M: 0.02, N: 0.02, R: 0.02, S: 0.02,
    V: 0.02, W: 0.02, Y: 0.02
  }

  HomoSap = {
    a: 0.3029549426680,
    c: 0.1979883004921,
    g: 0.1975473066391,
    t: 0.3015094502008
  }

  makeCumulative(table: { [x: string]: any; }) {
    var last = null;
    for (var c in table) {
      if (last) table[c] += table[last];
      last = c;
    }
  }

  fastaRepeat(n: number, seq: string) {
    var seqi = 0, lenOut = 60;
    while (n > 0) {
      if (n < lenOut) lenOut = n;
      if (seqi + lenOut < seq.length) {
        console.log(seq.substring(seqi, seqi + lenOut));
        seqi += lenOut;
      } else {
        var s = seq.substring(seqi);
        seqi = lenOut - s.length;
        console.log(s + seq.substring(0, seqi));
      }
      n -= lenOut;
    }
  }

  fastaRandom(n: number, table: any) {
    var line = new Array(60);
    this.makeCumulative(table);
    while (n > 0) {
      if (n < line.length) line = new Array(n);
      for (var i = 0; i < line.length; i++) {
        var r = this.rand(1);
        for (var c in table) {
          if (r < table[c]) {
            line[i] = c;
            break;
          }
        }
      }
      console.log(line.join(''));
      n -= line.length;
    }
  }


}
