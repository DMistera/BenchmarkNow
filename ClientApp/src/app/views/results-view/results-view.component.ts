import { Component, OnInit } from '@angular/core';
import { BenchmarkResult } from 'src/app/models/benchmark-result';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.css']
})
export class ResultsViewComponent implements OnInit {

  results: BenchmarkResult;

  constructor(private resultsService: ResultsService) { }

  ngOnInit(): void {
    this.resultsService.get().subscribe(results => {
      this.results = results;
    });
  }

}
