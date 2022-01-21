import { Injectable } from '@angular/core';
import { BenchmarkAlgorithm } from '../../models/benchmark-algorithm';

@Injectable({
  providedIn: 'root'
})
export class BinarytreesService implements BenchmarkAlgorithm {

  constructor() { }

  name = "Binary Trees";

  public run(n: number): void {
    const maxDepth = n;

    const stretchDepth = maxDepth + 1;
    const check = this.itemCheck(this.bottomUpTree(stretchDepth));
    console.log(`stretch tree of depth ${stretchDepth}\t check: ${check}`);

    const longLivedTree = this.bottomUpTree(maxDepth);

    for (let depth = 4; depth <= maxDepth; depth += 2) {
        const iterations = 1 << maxDepth - depth + 4;
        this.work(iterations, depth);
    }

    console.log(`long lived tree of depth ${maxDepth}\t check: ${this.itemCheck(longLivedTree)}`);
  }


  private cTreeNode(left?: TreeNode, right?: TreeNode): TreeNode {
      return {left, right};
  }

  private work(iterations: number, depth: number): void {
      let check = 0;
      for (let i = 0; i < iterations; i++) {
          check += this.itemCheck(this.bottomUpTree(depth));
      }
  }

  private itemCheck(node: TreeNode): number {
      if (node.left === undefined || node.right === undefined) {
          return 1;
      }
      return 1 + this.itemCheck(node.left) + this.itemCheck(node.right);
  }

  private bottomUpTree(depth: number): TreeNode {
      return depth > 0
          ? this.cTreeNode(this.bottomUpTree(depth - 1), this.bottomUpTree(depth - 1))
          : this.cTreeNode(undefined, undefined);
  }
}

interface TreeNode {
  left?: TreeNode,
  right?: TreeNode
}
