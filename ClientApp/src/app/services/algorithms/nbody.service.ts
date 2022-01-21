import { Injectable } from '@angular/core';
import { BenchmarkAlgorithm } from '../../models/benchmark-algorithm';

@Injectable({
  providedIn: 'root'
})
export class NbodyService implements BenchmarkAlgorithm {

  PI = Math.PI;
  SOLAR_MASS = 4 * this.PI * this.PI;
  DAYS_PER_YEAR = 365.24;
  name = "NBody";

  constructor() { }

  run(n: number): void {
    this.offsetMomentum();

    console.log(this.energy().toFixed(9));
    for (let i = 0; i < n; i++) {
      this.advance(0.01);
    }
    console.log(this.energy().toFixed(9));
  }

  Jupiter(): NBody {
      return {
          x: 4.84143144246472090e+00,
          y: -1.16032004402742839e+00,
          z: -1.03622044471123109e-01,
          vx: 1.66007664274403694e-03 * this.DAYS_PER_YEAR,
          vy: 7.69901118419740425e-03 * this.DAYS_PER_YEAR,
          vz: -6.90460016972063023e-05 * this.DAYS_PER_YEAR,
          mass: 9.54791938424326609e-04 * this.SOLAR_MASS
      };
  }

  Saturn(): NBody {
      return {
          x: 8.34336671824457987e+00,
          y: 4.12479856412430479e+00,
          z: -4.03523417114321381e-01,
          vx: -2.76742510726862411e-03 * this.DAYS_PER_YEAR,
          vy: 4.99852801234917238e-03 * this.DAYS_PER_YEAR,
          vz: 2.30417297573763929e-05 * this.DAYS_PER_YEAR,
          mass: 2.85885980666130812e-04 * this.SOLAR_MASS
      };
  }

  Uranus(): NBody {
      return {
          x: 1.28943695621391310e+01,
          y: -1.51111514016986312e+01,
          z: -2.23307578892655734e-01,
          vx: 2.96460137564761618e-03 * this.DAYS_PER_YEAR,
          vy: 2.37847173959480950e-03 * this.DAYS_PER_YEAR,
          vz: -2.96589568540237556e-05 * this.DAYS_PER_YEAR,
          mass: 4.36624404335156298e-05 * this.SOLAR_MASS
      };
  }

  Neptune(): NBody {
      return {
          x: 1.53796971148509165e+01,
          y: -2.59193146099879641e+01,
          z: 1.79258772950371181e-01,
          vx: 2.68067772490389322e-03 * this.DAYS_PER_YEAR,
          vy: 1.62824170038242295e-03 * this.DAYS_PER_YEAR,
          vz: -9.51592254519715870e-05 * this.DAYS_PER_YEAR,
          mass: 5.15138902046611451e-05 * this.SOLAR_MASS
      };
  }

  Sun(): NBody {
      return { x: 0.0, y: 0.0, z: 0.0, vx: 0.0, vy: 0.0, vz: 0.0, mass: this.SOLAR_MASS};
  }

  bodies = Array(this.Sun(), this.Jupiter(), this.Saturn(), this.Uranus(), this.Neptune());

  offsetMomentum(): void {
      let px = 0;
      let py = 0;
      let pz = 0;
      const size = this.bodies.length;
      for (let i = 0; i < size; i++) {
          const body = this.bodies[i];
          const mass = body.mass;
          px += body.vx * mass;
          py += body.vy * mass;
          pz += body.vz * mass;
      }

      const body = this.bodies[0];
      body.vx = -px / this.SOLAR_MASS;
      body.vy = -py / this.SOLAR_MASS;
      body.vz = -pz / this.SOLAR_MASS;
  }

  advance(dt: number): void {
      const size = this.bodies.length;

      for (let i = 0; i < size; i++) {
          const bodyi = this.bodies[i];
          let vxi = bodyi.vx;
          let vyi = bodyi.vy;
          let vzi = bodyi.vz;
          for (let j = i + 1; j < size; j++) {
              const bodyj = this.bodies[j];
              const dx = bodyi.x - bodyj.x;
              const dy = bodyi.y - bodyj.y;
              const dz = bodyi.z - bodyj.z;

              const d2 = dx * dx + dy * dy + dz * dz;
              const mag = dt / (d2 * Math.sqrt(d2));

              const massj = bodyj.mass;
              vxi -= dx * massj * mag;
              vyi -= dy * massj * mag;
              vzi -= dz * massj * mag;

              const massi = bodyi.mass;
              bodyj.vx += dx * massi * mag;
              bodyj.vy += dy * massi * mag;
              bodyj.vz += dz * massi * mag;
          }
          bodyi.vx = vxi;
          bodyi.vy = vyi;
          bodyi.vz = vzi;
      }

      for (let i = 0; i < size; i++) {
          const body = this.bodies[i];
          body.x += dt * body.vx;
          body.y += dt * body.vy;
          body.z += dt * body.vz;
      }
  }

  energy(): number {
      let e = 0;
      const size = this.bodies.length;

      for (let i = 0; i < size; i++) {
          const bodyi = this.bodies[i];

          e += 0.5 * bodyi.mass * ( bodyi.vx * bodyi.vx + bodyi.vy * bodyi.vy + bodyi.vz * bodyi.vz );

          for (let j = i + 1; j < size; j++) {
              const bodyj = this.bodies[j];
              const dx = bodyi.x - bodyj.x;
              const dy = bodyi.y - bodyj.y;
              const dz = bodyi.z - bodyj.z;

              const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
              e -= (bodyi.mass * bodyj.mass) / distance;
          }
      }
      return e;
  }
}

interface NBody {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  mass: number;
}
