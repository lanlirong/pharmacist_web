<template>
  <div id="container"></div>
</template>

<script>
import G6 from '@antv/g6';
export default {
  props: {
    graphData: {
      type: Object
    },
    height: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      lastSelectNode: null
    };
  },
  mounted() {
    this.graphInit();
  },
  methods: {
    graphInit() {
      const container = document.getElementById('container');
      const width = container.scrollWidth;
      //   const height = container.scrollHeight || 500;
      const graph = new G6.TreeGraph({
        container: 'container',
        width,
        height: this.height,
        fitCenter: true,
        // fitViewPadding: [20, 20, 20, 20],
        modes: {
          default: [
            'drag-canvas',
            {
              type: 'click-select',
              multiple: false
            }
          ]
        },
        defaultEdge: {
          type: 'cubic-horizontal'
        },
        defaultNode: {
          type: 'modelRect',
          size: [200, 40], //70
          style: {
            radius: 2,
            stroke: '#15417F',
            fill: '#ffffff',
            lineWidth: 0.5,
            fillOpacity: 1,
            cursor: 'pointer'
          },
          // label configurations
          labelCfg: {
            style: {
              fill: '#595959',
              fontSize: 8
            },
            offset: 20
          },
          descriptionCfg: {
            style: {
              fontSize: 7,
              offset: 20
            },
            paddingTop: -6
          },
          // left rect
          preRect: {
            show: true,
            width: 2,
            fill: '#15417F',
            radius: 2
          },
          // configurations for the four linkpoints
          linkPoints: {
            top: false,
            right: false,
            bottom: false,
            left: true,
            // the size of the linkpoints' circle
            size: 4,
            lineWidth: 0.5,
            fill: '#72CC4A',
            stroke: '#72CC4A'
          },
          // configurations for the icon
          logoIcon: {
            // whether to show the icon
            show: true,
            x: 0,
            y: 0,
            // the image url for the icon, string type
            img:
              'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
            width: 8,
            height: 8,
            // adjust the offset along x-axis for the icon
            offset: 0
          },
          // configurations for state icon
          stateIcon: {
            show: false,
            width: 10,
            height: 10,
            // adjust hte offset along x-axis for the icon
            offset: -5
          }
        },
        nodeStateStyles: {
          hover: {
            lineWidth: 0.5,
            stroke: '#15417F',
            fill: '#E5E8EE'
          },
          selected: {
            lineWidth: 0.5,
            stroke: '#15417F',
            fill: '#e6f7ff',
            size: [300, 100]
          }
        },
        layout: {
          type: 'compactBox',
          direction: 'LR',
          getId: function getId(d) {
            return d.id;
          }
        }
      });

      graph.node(function(node) {
        if (node.id == 'id0') {
          return {
            id: 'circle',
            x: -150,
            type: 'circle',
            size: [20, 20],
            labelCfg: {
              position: 'bottom',
              offset: 5
            },
            style: {
              fill: '#8597b6',
              stroke: '#000',
              lineWidth: 1
            },
            linkPoints: {
              left: false
            }
          };
        } else {
          return node;
        }
      });

      graph.data(this.graphData);
      graph.render();
      graph.fitView();
      graph.on('node:mouseenter', evt => {
        const { item } = evt;
        graph.setItemState(item, 'hover', true);
      });

      graph.on('node:mouseleave', evt => {
        const { item } = evt;
        graph.setItemState(item, 'hover', false);
      });
      // 设置选中图标
      graph.on('nodeselectchange', e => {
        // 清除上一选中样式
        if (this.lastSelectNode)
          graph.updateItem(this.lastSelectNode, {
            stateIcon: {
              show: false
            }
          });
        if (e.select) {
          graph.updateItem(e.target, {
            stateIcon: {
              show: true
            }
          });
        }
        this.lastSelectNode = e.target;
      });
      // 点击展示右侧信息
      graph.on('node:click', evt => {
        const { item } = evt;
        this.getSelectData(item);
      });

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return;
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return;
          graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    },
    getSelectData(item) {
      if (item._cfg.model.id !== 'circle') {
        const {
          name,
          interaction,
          result,
          suggest,
          evidence,
          level,
          reference1,
          reference2,
          reference3,
          reference4,
          reference5
        } = item._cfg.model;
        let data = { name, interaction, result, suggest, evidence, level };
        data.references = [
          reference1,
          reference2,
          reference3,
          reference4,
          reference5
        ];
        this.$emit('clickNode', data);
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
