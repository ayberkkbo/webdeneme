import AreaSplineChart from 'ember-website/utils/highcharts/area-spline-chart';
import { module, test } from 'qunit';

module('Unit | Utility | highcharts/area-spline-chart', function (hooks) {
  hooks.beforeEach(function () {
    this.chart = {
      categories: ['1.x', '2.x', '3.0-3.4', '3.5-3.8', '3.9-3.12', '3.13-3.16'],
      subtitle: '(Multi-select question)',
      title: 'Which version(s) of Ember are in use in your apps?',
    };

    this.rawData = [
      {
        color: '#1E719B',
        label: '2019',
        values: [
          100 * (79 / 1232), // 1.x
          100 * (443 / 1232), // 2.x
          100 * (488 / 1232), // 3.0 - 3.4
          100 * (675 / 1232), // 3.5 - 3.8
        ],
      },
      {
        color: '#9B2918',
        label: '2020',
        values: [
          100 * (27 / 1006), // 1.x
          100 * (111 / 1006), // 2.x
          100 * (121 / 1006), // 3.0 - 3.4
          100 * (148 / 1006), // 3.5 - 3.8
          100 * (291 / 1006), // 3.9 - 3.12
          100 * (524 / 1006), // 3.13 - 3.16
        ],
      },
    ];
  });

  module('highchartsOptions', function () {
    test('returns a configuration object that is compatible with Highcharts', function (assert) {
      const { highchartsOptions } = new AreaSplineChart({
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
            type: 'areaspline',
          },

          subtitle: {
            text: '(Multi-select question)',
          },

          title: {
            text: 'Which version(s) of Ember are in use in your apps?',
          },

          tooltip: {
            pointFormat: '{series.name}: {point.y:.1f}%',
          },

          xAxis: {
            categories: [
              '1.x',
              '2.x',
              '3.0-3.4',
              '3.5-3.8',
              '3.9-3.12',
              '3.13-3.16',
            ],
            type: 'category',
          },

          yAxis: {
            labels: {
              format: '{value} %',
            },
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

      const { isLegendEnabled } = new AreaSplineChart({
        chart: this.chart,
        rawData,
      });

      assert.true(isLegendEnabled, 'We get the correct value.');
    });

    test('returns false when series has 1 element', function (assert) {
      const rawData = [this.rawData[0]];

      const { isLegendEnabled } = new AreaSplineChart({
        chart: this.chart,
        rawData,
      });

      assert.false(isLegendEnabled, 'We get the correct value.');
    });

    test('returns false when series has 0 elements', function (assert) {
      const rawData = [];

      const { isLegendEnabled } = new AreaSplineChart({
        chart: this.chart,
        rawData,
      });

      assert.false(isLegendEnabled, 'We get the correct value.');
    });
  });

  module('series', function () {
    test('transforms rawData into an array that is compatible with Highcharts', function (assert) {
      const { series } = new AreaSplineChart({
        chart: this.chart,
        rawData: this.rawData,
      });

      assert.strictEqual(series.length, 2, 'We see 2 series of data.');

      // Check series 1
      assert.deepEqual(
        {
          color: series[0].color,
          data: series[0].data.map(Math.round),
          name: series[0].name,
        },
        {
          color: '#1E719B',
          data: [6, 36, 40, 55],
          name: '2019',
        },
        'We get the correct data for the 1st series.'
      );

      // Check series 2
      assert.deepEqual(
        {
          color: series[1].color,
          data: series[1].data.map(Math.round),
          name: series[1].name,
        },
        {
          color: '#9B2918',
          data: [3, 11, 12, 15, 29, 52],
          name: '2020',
        },
        'We get the correct data for the 2nd series.'
      );
    });
  });
});
