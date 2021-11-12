# ZeroBallistics

A tool to visualize bullet ballistics. [Try it here](https://deeb.ch/zeroballistics/)

* Explore different zero distances (50m vs. 100m) and its impact on bullet drop
* See when you need hold above, or below
* Analyse EOTECH circle and 2-dot possibilities

![Screenshot](/assets/xtarget-screenshot.png)



## Serve

```
python3 -m http.server
```

## Precision 

It is not meant to be precise.

* shooterscalculator data 
  * 1 yard = 1m
  * 1 inch = 2.54cm
* 1 pixel = 1cm
* 1 MOA = 1 inch @ 100m
* Eotech 2nd dot offset is 10.5moa

## Data source

Link: http://www.shooterscalculator.com/ballistic-trajectory-chart.php

* 223 Remington 
* Drag Function: G+
* Ballistic Coefficient: 0.371 
* Bullet weight: 70gr
* Initial velocity: *2850fps*
* sight height: 3.7in (9.4cm)
* shooting angle: 0°
* Zero: 25, 37, 50, 100y
