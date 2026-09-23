import { OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
export declare class ChartWidgetComponent implements AfterViewInit, OnChanges {
    chartCanvas: ElementRef<HTMLCanvasElement>;
    period: number;
    private chartInstance;
    constructor();
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private initChart;
    private updateChart;
    private generateChartData;
    private createGradient;
    private hexToRgb;
    private getChartOptions;
}
//# sourceMappingURL=chart-widget.component.d.ts.map