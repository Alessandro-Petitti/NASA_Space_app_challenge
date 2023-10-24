# Lunar Seismic Events Visualization

![](https://github.com/Alessandro-Petitti/Space_app_challenge/blob/main/demo.gif)

## Introduction

Welcome to the Lunar Seismic Events Visualization project repository! This project was developed as a response to a challenge to create an app that visualizes seismic events detected by the EASEP and ALSEP instruments on a 3-D digital moon globe. The challenge encouraged creative visualization ideas, and we've built a web application for this purpose.

## Project Overview

In this repository, you'll find the code for the 3-D web application and the Arduino code to build a physical moonquake simulator. Our goal is to provide an interactive and immersive experience for users interested in exploring lunar seismic events.

## Repository Structure

This repository is organized as follows:

- `ThreeJs.../`: Contains the code for the 3-D web application.
- `nasa.ino/`: Contains the Arduino code for the moonquake simulator.

## Getting Started

### Running the 3-D Web Application

To explore lunar seismic events on the 3-D digital moon globe, follow these steps:

1. Clone this repository to your local machine.

2. Open the `ThreeJs...` directory.

3. Open the `index.html` file in your web browser.

4. Interact with the 3-D lunar globe to visualize seismic events.

### Building the Moonquake Simulator

Here are the component used for the simulator:

* [ ] Arduino Uno R3

* [ ] CC motor

* [ ] Potentiometer

* [ ] L298n motor driver

* [ ] MPU6050 (3 axis accelerometer)              

Everything was connected throught a breadbord, powering the motor wih a 9V battery, regulated with a PWM pin on the arduino board. The driver aplifies the signal coming from the PWM, which would otherwise be too week to move the motor, and controlls it's spinning direction.

## Additional Information

The lunar seismic events can be visualized in various ways, from pins on the globe to concentric torus shapes or circles. We encourage you to explore the project and contribute your creative ideas to enhance the experience.

Feel free to open issues, submit pull requests, or reach out to us if you have any questions, suggestions, or feedback.

## Credits

This project was developed by Alessandro Petitti, Alessandro Ferranti Beatrice Bonifazi, Federico Bini, Sara Coppola and Esteban Rocchi as a response to the challenge.


