const _ = require('./lodash');
var object = {
 "name": "flare",
 "children": [
  {
   "name": "display",
   "children": [
    {"name": "DirtySprite", "size": 8833},
    {"name": "LineSprite", "size": 1732},
    {"name": "RectSprite", "size": 3623},
    {"name": "TextSprite", "size": 10066}
   ]
  }
 ]
};

var other = {
 "name": "flare",
 "children": [
  {
   "name": "display",
   "children": [
    {"name": "DirtySprite", "size": 8833},
    {"name": "LineSprite", "size": 1732},
    {"name": "RectSprite", "size": 3623},
    {"name": "TextSprite", "size": 10066}
   ]
  }
 ]
};

var object = {
//  "name": "flare",
//  "children": [
//   {
//    "name": "display",
//    "children": [
//     {"name": "DirtySprite", "size": 8833},
//     {"name": "LineSprite", "size": 1732},
//     {"name": "RectSprite", "size": 3623},
//     {"name": "TextSprite", "size": 10066}
//    ]
//   },
//   {
//    "name": "flex",
//    "children": [
//     {"name": "FlareVis", "size": 4116}
//    ]
//   },
//   {
//    "name": "util",
//    "children": [
//     {"name": "Arrays", "size": 8258},
//     {"name": "Colors", "size": 10001},
//     {"name": "Dates", "size": 8217},
//     {"name": "Displays", "size": 12555},
//     {"name": "Filter", "size": 2324},
//     {"name": "Geometry", "size": 10993},
//     {
//      "name": "heap",
//      "children": [
//       {"name": "FibonacciHeap", "size": 9354},
//       {"name": "HeapNode", "size": 1233}
//      ]
//     },
//     {"name": "IEvaluable", "size": 335},
//     {"name": "IPredicate", "size": 383},
//     {"name": "IValueProxy", "size": 874},
//     {
//      "name": "math",
//      "children": [
//       {"name": "DenseMatrix", "size": 3165},
//       {"name": "IMatrix", "size": 2815},
//       {"name": "SparseMatrix", "size": 3366}
//      ]
//     },
//     {"name": "Maths", "size": 17705},
//     {"name": "Orientation", "size": 1486},
//     {
//      "name": "palette",
//      "children": [
//       {"name": "ColorPalette", "size": 6367},
//       {"name": "Palette", "size": 1229},
//       {"name": "ShapePalette", "size": 2059},
//       {"name": "SizePalette", "size": 2291}
//      ]
//     },
//     {"name": "Property", "size": 5559},
//     {"name": "Shapes", "size": 19118},
//     {"name": "Sort", "size": 6887},
//     {"name": "Stats", "size": 6557},
//     {"name": "Strings", "size": 22026}
//    ]
//   },
//   {
//    "name": "vis",
//    "children": [
//     {
//      "name": "axis",
//      "children": [
//       {"name": "Axes", "size": 1302},
//       {"name": "Axis", "size": 24593},
//       {"name": "AxisGridLine", "size": 652},
//       {"name": "AxisLabel", "size": 636},
//       {"name": "CartesianAxes", "size": 6703}
//      ]
//     },
//     {
//      "name": "controls",
//      "children": [
//       {"name": "AnchorControl", "size": 2138},
//       {"name": "ClickControl", "size": 3824},
//       {"name": "Control", "size": 1353},
//       {"name": "ControlList", "size": 4665},
//       {"name": "DragControl", "size": 2649},
//       {"name": "ExpandControl", "size": 2832},
//       {"name": "HoverControl", "size": 4896},
//       {"name": "IControl", "size": 763},
//       {"name": "PanZoomControl", "size": 5222},
//       {"name": "SelectionControl", "size": 7862},
//       {"name": "TooltipControl", "size": 8435}
//      ]
//     },
//     {
//      "name": "data",
//      "children": [
//       {"name": "Data", "size": 20544},
//       {"name": "DataList", "size": 19788},
//       {"name": "DataSprite", "size": 10349},
//       {"name": "EdgeSprite", "size": 3301},
//       {"name": "NodeSprite", "size": 19382},
//       {
//        "name": "render",
//        "children": [
//         {"name": "ArrowType", "size": 698},
//         {"name": "EdgeRenderer", "size": 5569},
//         {"name": "IRenderer", "size": 353},
//         {"name": "ShapeRenderer", "size": 2247}
//        ]
//       },
//       {"name": "ScaleBinding", "size": 11275},
//       {"name": "Tree", "size": 7147},
//       {"name": "TreeBuilder", "size": 9930}
//      ]
//     },
//     {
//      "name": "events",
//      "children": [
//       {"name": "DataEvent", "size": 2313},
//       {"name": "SelectionEvent", "size": 1880},
//       {"name": "TooltipEvent", "size": 1701},
//       {"name": "VisualizationEvent", "size": 1117}
//      ]
//     },
//     {
//      "name": "legend",
//      "children": [
//       {"name": "Legend", "size": 20859},
//       {"name": "LegendItem", "size": 4614},
//       {"name": "LegendRange", "size": 10530}
//      ]
//     },
//     {
//      "name": "operator",
//      "children": [
//       {
//        "name": "distortion",
//        "children": [
//         {"name": "BifocalDistortion", "size": 4461},
//         {"name": "Distortion", "size": 6314},
//         {"name": "FisheyeDistortion", "size": 3444}
//        ]
//       },
//       {
//        "name": "encoder",
//        "children": [
//         {"name": "ColorEncoder", "size": 3179},
//         {"name": "Encoder", "size": 4060},
//         {"name": "PropertyEncoder", "size": 4138},
//         {"name": "ShapeEncoder", "size": 1690},
//         {"name": "SizeEncoder", "size": 1830}
//        ]
//       },
//       {
//        "name": "filter",
//        "children": [
//         {"name": "FisheyeTreeFilter", "size": 5219},
//         {"name": "GraphDistanceFilter", "size": 3165},
//         {"name": "VisibilityFilter", "size": 3509}
//        ]
//       },
//       {"name": "IOperator", "size": 1286},
//       {
//        "name": "label",
//        "children": [
//         {"name": "Labeler", "size": 9956},
//         {"name": "RadialLabeler", "size": 3899},
//         {"name": "StackedAreaLabeler", "size": 3202}
//        ]
//       },
//       {
//        "name": "layout",
//        "children": [
//         {"name": "AxisLayout", "size": 6725},
//         {"name": "BundledEdgeRouter", "size": 3727},
//         {"name": "CircleLayout", "size": 9317},
//         {"name": "CirclePackingLayout", "size": 12003},
//         {"name": "DendrogramLayout", "size": 4853},
//         {"name": "ForceDirectedLayout", "size": 8411},
//         {"name": "IcicleTreeLayout", "size": 4864},
//         {"name": "IndentedTreeLayout", "size": 3174},
//         {"name": "Layout", "size": 7881},
//         {"name": "NodeLinkTreeLayout", "size": 12870},
//         {"name": "PieLayout", "size": 2728},
//         {"name": "RadialTreeLayout", "size": 12348},
//         {"name": "RandomLayout", "size": 870},
//         {"name": "StackedAreaLayout", "size": 9121},
//         {"name": "TreeMapLayout", "size": 9191}
//        ]
//       },
//       {"name": "Operator", "size": 2490},
//       {"name": "OperatorList", "size": 5248},
//       {"name": "OperatorSequence", "size": 4190},
//       {"name": "OperatorSwitch", "size": 2581},
//       {"name": "SortOperator", "size": 2023}
//      ]
//     },
//     {"name": "Visualization", "size": 16540}
//    ]
//   }
//  ]
// };
 
// var other ={
//  "name": "flare",
//  "children": [
//   {
//    "name": "analytics",
//    "children": [
//     {
//      "name": "cluster",
//      "children": [
//       {"name": "AgglomerativeCluster", "size": 3938},
//       {"name": "CommunityStructure", "size": 3812},
//       {"name": "HierarchicalCluster", "size": 6714},
//       {"name": "MergeEdge", "size": 743}
//      ]
//     },
//     {
//      "name": "graph",
//      "children": [
//       {"name": "BetweennessCentrality", "size": 3534},
//       {"name": "LinkDistance", "size": 5731},
//       {"name": "MaxFlowMinCut", "size": 7840},
//       {"name": "ShortestPaths", "size": 5914},
//       {"name": "SpanningTree", "size": 3416}
//      ]
//     },
//     {
//      "name": "optimization",
//      "children": [
//       {"name": "AspectRatioBanker", "size": 7074}
//      ]
//     }
//    ]
//   },
//   {
//    "name": "display",
//    "children": [
//     {"name": "DirtySprite", "size": 8833},
//     {"name": "LineSprite", "size": 1732},
//     {"name": "RectSprite", "size": 3623},
//     {"name": "TextSprite", "size": 10066}
//    ]
//   },
//   {
//    "name": "util",
//    "children": [
//     {"name": "Arrays", "size": 8258},
//     {"name": "Colors", "size": 10001},
//     {"name": "Dates", "size": 8217},
//     {"name": "Displays", "size": 12555},
//     {"name": "Filter", "size": 2324},
//     {"name": "Geometry", "size": 10993},
//     {
//      "name": "heap",
//      "children": [
//       {"name": "FibonacciHeap", "size": 9354},
//       {"name": "HeapNode", "size": 1233}
//      ]
//     },
//     {"name": "IEvaluable", "size": 335},
//     {"name": "IPredicate", "size": 383},
//     {"name": "IValueProxy", "size": 874},
//     {
//      "name": "math",
//      "children": [
//       {"name": "DenseMatrix", "size": 3165},
//       {"name": "IMatrix", "size": 2815},
//       {"name": "SparseMatrix", "size": 3366}
//      ]
//     },
//     {"name": "Maths", "size": 17705},
//     {"name": "Orientation", "size": 1486},
//     {
//      "name": "palette",
//      "children": [
//       {"name": "ColorPalette", "size": 6367},
//       {"name": "Palette", "size": 1229},
//       {"name": "ShapePalette", "size": 2059},
//       {"name": "SizePalette", "size": 2291}
//      ]
//     },
//     {"name": "Property", "size": 5559},
//     {"name": "Shapes", "size": 19118},
//     {"name": "Sort", "size": 6887},
//     {"name": "Stats", "size": 6557},
//     {"name": "Strings", "size": 22026}
//    ]
//   },
//   {
//    "name": "vis",
//    "children": [
//     {
//      "name": "axis",
//      "children": [
//       {"name": "Axes", "size": 1302},
//       {"name": "Axis", "size": 24593},
//       {"name": "AxisGridLine", "size": 652},
//       {"name": "AxisLabel", "size": 636},
//       {"name": "CartesianAxes", "size": 6703}
//      ]
//     },
//     {
//      "name": "controls",
//      "children": [
//       {"name": "AnchorControl", "size": 2138},
//       {"name": "ClickControl", "size": 3824},
//       {"name": "Control", "size": 1353},
//       {"name": "ControlList", "size": 4665},
//       {"name": "DragControl", "size": 2649},
//       {"name": "ExpandControl", "size": 2832},
//       {"name": "HoverControl", "size": 4896},
//       {"name": "IControl", "size": 763},
//       {"name": "PanZoomControl", "size": 5222},
//       {"name": "SelectionControl", "size": 7862},
//       {"name": "TooltipControl", "size": 8435}
//      ]
//     },
//     {
//      "name": "data",
//      "children": [
//       {"name": "Data", "size": 20544},
//       {"name": "DataList", "size": 19788},
//       {"name": "DataSprite", "size": 10349},
//       {"name": "EdgeSprite", "size": 3301},
//       {"name": "NodeSprite", "size": 19382},
//       {
//        "name": "render",
//        "children": [
//         {"name": "ArrowType", "size": 698},
//         {"name": "EdgeRenderer", "size": 5569},
//         {"name": "IRenderer", "size": 353},
//         {"name": "ShapeRenderer", "size": 2247}
//        ]
//       },
//       {"name": "ScaleBinding", "size": 11275},
//       {"name": "Tree", "size": 7147},
//       {"name": "TreeBuilder", "size": 9930}
//      ]
//     },
//     {
//      "name": "events",
//      "children": [
//       {"name": "DataEvent", "size": 2313},
//       {"name": "SelectionEvent", "size": 1880},
//       {"name": "TooltipEvent", "size": 1701},
//       {"name": "VisualizationEvent", "size": 1117}
//      ]
//     },
//     {
//      "name": "legend",
//      "children": [
//       {"name": "Legend", "size": 20859},
//       {"name": "LegendItem", "size": 4614},
//       {"name": "LegendRange", "size": 10530}
//      ]
//     },
//     {
//      "name": "operator",
//      "children": [
//       {
//        "name": "distortion",
//        "children": [
//         {"name": "BifocalDistortion", "size": 4461},
//         {"name": "Distortion", "size": 6314},
//         {"name": "FisheyeDistortion", "size": 3444}
//        ]
//       },
//       {
//        "name": "encoder",
//        "children": [
//         {"name": "ColorEncoder", "size": 3179},
//         {"name": "Encoder", "size": 4060},
//         {"name": "PropertyEncoder", "size": 4138},
//         {"name": "ShapeEncoder", "size": 1690},
//         {"name": "SizeEncoder", "size": 1830}
//        ]
//       },
//       {
//        "name": "filter",
//        "children": [
//         {"name": "FisheyeTreeFilter", "size": 5219},
//         {"name": "GraphDistanceFilter", "size": 3165},
//         {"name": "VisibilityFilter", "size": 3509}
//        ]
//       },
//       {"name": "IOperator", "size": 1286},
//       {
//        "name": "label",
//        "children": [
//         {"name": "Labeler", "size": 9956},
//         {"name": "RadialLabeler", "size": 3899},
//         {"name": "StackedAreaLabeler", "size": 3202}
//        ]
//       },
//       {
//        "name": "layout",
//        "children": [
//         {"name": "AxisLayout", "size": 6725},
//         {"name": "BundledEdgeRouter", "size": 3727},
//         {"name": "CircleLayout", "size": 9317},
//         {"name": "CirclePackingLayout", "size": 12003},
//         {"name": "DendrogramLayout", "size": 4853},
//         {"name": "ForceDirectedLayout", "size": 8411},
//         {"name": "IcicleTreeLayout", "size": 4864},
//         {"name": "IndentedTreeLayout", "size": 3174},
//         {"name": "Layout", "size": 7881},
//         {"name": "NodeLinkTreeLayout", "size": 12870},
//         {"name": "PieLayout", "size": 2728},
//         {"name": "RadialTreeLayout", "size": 12348},
//         {"name": "RandomLayout", "size": 870},
//         {"name": "StackedAreaLayout", "size": 9121},
//         {"name": "TreeMapLayout", "size": 9191}
//        ]
//       },
//       {"name": "Operator", "size": 2490},
//       {"name": "OperatorList", "size": 5248},
//       {"name": "OperatorSequence", "size": 4190},
//       {"name": "OperatorSwitch", "size": 2581},
//       {"name": "SortOperator", "size": 2023}
//      ]
//     },
//     {"name": "Visualization", "size": 16540}
//    ]
//   }
//  ]
};

/* jnstrument.console.test */

var test= 'dsfadfa';

console.log(/*jnstrument.merge*/_.merge(object, other)/*/jnstrument.merge*/);
// /jnstrument.console

  /* jnstrument.function */
(function(){
  

 var test = "hello";
 
 
 })();
 
  // /jnstrument.function