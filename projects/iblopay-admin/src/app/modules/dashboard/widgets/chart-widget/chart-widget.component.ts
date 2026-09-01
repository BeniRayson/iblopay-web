import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-chart-widget',
    templateUrl: './chart-widget.component.html',
    styleUrls: ['./chart-widget.component.scss']
})
export class ChartWidgetComponent implements AfterViewInit, OnChanges {
    @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
    @Input() period: number = 30;

    private chartInstance: Chart | null = null;

    constructor() { }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initChart();
        }, 300);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['period'] && !changes['period'].firstChange) {
            this.updateChart();
        }
    }

    private initChart(): void {
        if (!this.chartCanvas) return;

        const ctx = this.chartCanvas.nativeElement.getContext('2d');
        if (!ctx) return;

        const data = this.generateChartData(this.period);

        this.chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Dépôts (M Fbu)',
                        data: data.depots,
                        borderColor: '#3b82f6',
                        backgroundColor: this.createGradient(ctx, '#3b82f6'),
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: '#3b82f6',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2
                    },
                    {
                        label: 'Retraits (M Fbu)',
                        data: data.retraits,
                        borderColor: '#ef4444',
                        backgroundColor: this.createGradient(ctx, '#ef4444'),
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: '#ef4444',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: '#ef4444',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2
                    },
                    {
                        label: 'Services Publics (M Fbu)',
                        data: data.services,
                        borderColor: '#ec4899',
                        backgroundColor: this.createGradient(ctx, '#ec4899'),
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3,
                        pointBackgroundColor: '#ec4899',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: '#ec4899',
                        pointHoverBorderColor: '#fff',
                        pointHoverBorderWidth: 2,
                        borderDash: [6, 4]
                    }
                ]
            },
            options: this.getChartOptions()
        });
    }

    private updateChart(): void {
        if (!this.chartInstance) {
            this.initChart();
            return;
        }

        const data = this.generateChartData(this.period);
        if (this.chartInstance.data && this.chartInstance.data.datasets) {
            this.chartInstance.data.labels = data.labels;
            if (this.chartInstance.data.datasets[0]) {
                this.chartInstance.data.datasets[0].data = data.depots;
            }
            if (this.chartInstance.data.datasets[1]) {
                this.chartInstance.data.datasets[1].data = data.retraits;
            }
            if (this.chartInstance.data.datasets[2]) {
                this.chartInstance.data.datasets[2].data = data.services;
            }
            this.chartInstance.update();
        }
    }

    private generateChartData(points: number): { labels: string[], depots: number[], retraits: number[], services: number[] } {
        const labels: string[] = [];
        const depots: number[] = [];
        const retraits: number[] = [];
        const services: number[] = [];

        const startDate = new Date(2025, 5, 29);

        for (let i = points - 1; i >= 0; i--) {
            const date = new Date(startDate);
            date.setDate(date.getDate() - i);

            if (i % Math.max(1, Math.floor(points / 12)) === 0 || i === points - 1) {
                labels.push(`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`);
            } else {
                labels.push('');
            }

            const d = 40 + 20 * Math.sin((i / points) * 2 * Math.PI * 1.5) + (Math.random() - 0.5) * 3;
            const r = 25 + 15 * Math.sin((i / points) * 2 * Math.PI * 1.5 + 0.8) + (Math.random() - 0.5) * 2.5;
            const s = 18 + 12 * Math.sin((i / points) * 2 * Math.PI * 1.5 + 1.6) + (Math.random() - 0.5) * 2;

            depots.push(Math.round(d * 10) / 10);
            retraits.push(Math.round(r * 10) / 10);
            services.push(Math.round(s * 10) / 10);
        }

        return { labels, depots, retraits, services };
    }

    private createGradient(ctx: CanvasRenderingContext2D, color: string): CanvasGradient {
        const gradient = ctx.createLinearGradient(0, 0, 0, 180);
        const rgb = this.hexToRgb(color);
        if (rgb) {
            gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35)`);
            gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        }
        return gradient;
    }

    private hexToRgb(hex: string): { r: number, g: number, b: number } | null {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (result && result[1] && result[2] && result[3]) {
            return {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            };
        }
        return null;
    }

    private getChartOptions(): ChartConfiguration['options'] {
        return {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 800,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#8896b3',
                        font: { size: 11, weight: 500 },
                        boxWidth: 12,
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(13,26,47,.95)',
                    borderColor: '#1a2a45',
                    borderWidth: 1,
                    titleColor: '#fff',
                    bodyColor: '#8896b3',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: (context: any) => {
                            return `${context.dataset.label}: ${(context.parsed.y as number).toFixed(1)} M Fbu`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#5c6986',
                        font: { size: 9, weight: 500 },
                        maxRotation: 45,
                        autoSkip: true,
                        maxTicksLimit: 15
                    }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,.06)' },
                    ticks: {
                        color: '#5c6986',
                        font: { size: 10, weight: 500 },
                        callback: (value: any) => value + 'M'
                    },
                    beginAtZero: true
                }
            },
            interaction: { intersect: false, mode: 'index' },
            hover: { mode: 'index', intersect: false }
        };
    }
}