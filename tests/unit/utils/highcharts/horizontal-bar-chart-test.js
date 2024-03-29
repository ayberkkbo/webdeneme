import HorizontalBarChart from 'ember-website/utils/highcharts/horizontal-bar-chart';
import { module, test } from 'qunit';

module('Unit | Utility | highcharts/horizontal-bar-chart', function (hooks) {
  hooks.beforeEach(function () {
    this.chart = {
      categories: [
        'Writing RFCs',
        'Commenting on RFCs',
        'Reading RFCs',
        'Opening PRs',
        'Stack Overflow',
        'emberjs.com blog',
      ],
      subtitle: 'Movers and Shakers from Last Year',
      title: 'How do you stay up to date with Ember?',
    };

    this.rawData = [
      {
        color: '#4B4B4B',
        label: '2017',
        values: [1.9, 5.2, 33.3, 16.4, 41.6, 49.8],
      },
      {
        color: '#F23818',
        label: '2018',
        values: [3.0, 9.8, 52.2, 23.8, 34.2, 57.8],
      },
    ];
  });

  module('highchartsOptions', function () {
    test('returns a configuration object that is compatible with Highcharts', function (assert) {
      const { highchartsOptions } = new HorizontalBarChart({
        chart: this.chart,
        rawData: this.rawData,
      });

      // We tested `legend` in a separate module
      delete highchartsOptions.legend;

      // We tested `series` in a separate module
      delete highchartsOptions.series;

      assert.deepEqual(
        highchartsOptions,
        {
          chart: {
            backgroundColor: 'transparent',
            type: 'bar',
          },

          subtitle: {
            text: 'Movers and Shakers from Last Year',
          },

          title: {
            text: 'How do you stay up to date with Ember?',
          },

          tooltip: {
            pointFormat: '{series.name}: {point.y:.1f}%',
          },

          xAxis: {
            categories: [
              'Writing RFCs',
              'Commenting on RFCs',
              'Reading RFCs',
              'Opening PRs',
              'Stack Overflow',
              'emberjs.com blog',
            ],
            type: 'category',
          },

          yAxis: {
            labels: {
              format: '{value} %',
            },
            min: 0,
            title: {
              text: 'Percent of responses',
            },
          },
        },
        'We get the correct value.'
      );
    });
  });

  module('isLegendEnabled', function () {
    test('returns true when series has more than 1 element', function (assert) {
      const rawData = this.rawData;

      const { isLegendEnabled } = new HorizontalBarChart({
        chart: this.chart,
        rawData,
      });

      assert.true(isLegendEnabled, 'We get the correct value.');
    });

    test('returns false when series has 1 element', function (assert) {
      const rawData = [this.rawData[0]];

      const { isLegendEnabled } = new HorizontalBarChart({
        chart: this.chart,
        rawData,
      });

      assert.false(isLegendEnabled, 'We get the correct value.');
    });

    test('returns false when series has 0 elements', function (assert) {
      const rawData = [];

      const { isLegendEnabled } = new HorizontalBarChart({
        chart: this.chart,
        rawData,
      });

      assert.false(isLegendEnabled, 'We get the correct value.');
    });
  });

  module('series', function () {
    test('transforms rawData into an array that is compatible with Highcharts', function (assert) {
      const { series } = new HorizontalBarChart({
        chart: this.chart,
        rawData: this.rawData,
      });

      assert.strictEqual(series.length, 2, 'We see 2 series of data.');

      // Check series 1
      assert.deepEqual(
        series[0],
        {
          color: '#4B4B4B',
          data: [1.9, 5.2, 33.3, 16.4, 41.6, 49.8],
          name: '2017',
        },
        'We get the correct data for the 1st series.'
      );

      // Check series 2
      assert.deepEqual(
        series[1],
        {
          color: '#F23818',
          data: [3.0, 9.8, 52.2, 23.8, 34.2, 57.8],
          name: '2018',
        },
        'We get the correct data for the 2nd series.'
      );
    });
  });
});
