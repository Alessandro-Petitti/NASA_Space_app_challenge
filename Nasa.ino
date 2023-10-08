#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Wire.h>

#define MOTOR_PIN1 2
#define MOTOR_PIN2 4


Adafruit_MPU6050 mpu;



// INPUT: Potentiometer should be connected to 5V and GND
int potPin = A3; // Potentiometer output connected to analog pin 3
int potVal = 0; // Variable to store the input from the potentiometer

int switchState = 0;
int preparatorio = 0; //0 è non premuto 1 è premuto
int n_pression = 0; //times the button has been pressed
float acc_primax;
float acc_primay;
float acc_primaz;
float acc_girox;
float acc_giroy;
float acc_giroz;
float redVal, bluVal, grnVal;

void setup() {
  //configure motor's pin
  pinMode(MOTOR_PIN1, OUTPUT);
  pinMode(MOTOR_PIN2, OUTPUT);
  //initate serial comunication
  Serial.begin(115200);
  //enable pin
  pinMode(3, OUTPUT); 
  //led output
  pinMode(9,OUTPUT); //green
  pinMode(10,OUTPUT); //yellow
  pinMode(11,OUTPUT); //red
  //button pin
  //pinMode(6,INPUT); 

  //set spin direction
  digitalWrite(MOTOR_PIN1, HIGH);
  digitalWrite(MOTOR_PIN2, LOW);
while (!Serial) {
    delay(10); // will pause Zero, Leonardo, etc until serial console opens
  }

  // Try to initialize!
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }

  mpu.setAccelerometerRange(MPU6050_RANGE_16_G);
  mpu.setGyroRange(MPU6050_RANGE_250_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  Serial.println("");
  delay(100);
}

void loop() {
  potVal = analogRead(potPin);
  //Serial.println(potVal);
  sensors_event_t a, g, temp;
  mpu.getEvent(&a, &g, &temp);
  if (potVal < 341)  // Lowest third of the potentiometer's range (0-340)
  {                  
    potVal = (potVal * 3) / 4; // Normalize to 0-255
    redVal = 256 - potVal;  // Red from full to off
    grnVal = potVal;        // Green from off to full
    bluVal = 1;       
    analogWrite(3, 80);
  }
  else if (potVal < 682) // Middle third of potentiometer's range (341-681)
  {
    potVal = ( (potVal-341) * 3) / 4; // Normalize to 0-255

    redVal = 1;            // Red off
    grnVal = 256 - potVal; // Green from full to off
    bluVal = potVal;       // Blue from off to full
    analogWrite(3, 150);
  }
  else  // Upper third of potentiometer"s range (682-1023), highest earthquake
  {
    potVal = ( (potVal-683) * 3) / 4; // Normalize to 0-255

    redVal = potVal;       // Red from off to full
    grnVal = 1;            // Green off
    bluVal = 256 - potVal; // Blue from full to off
    analogWrite(3, 255);
  }
  analogWrite(11, redVal);   // Write values to LED pins
  analogWrite(9, grnVal); 
  analogWrite(10, bluVal);  

  //aggiorna ultimi valori
  if (abs(acc_primax-a.acceleration.x)> 30)
  {
    acc_girox = acc_primax;
  }
  else
  {
    acc_girox = a.acceleration.x;
  }

  if (abs(acc_primay-a.acceleration.y)> 30)
  {
    acc_giroy = acc_primay;
  }
   else
  {
    acc_giroy = a.acceleration.y;
  }

  if (abs(acc_primaz-a.acceleration.z)> 30)
  {
    acc_giroz = acc_primaz;
  }
   else
  {
    acc_giroz = a.acceleration.z;
  }

  Serial.print(acc_girox);
  Serial.print(",");
  Serial.print(acc_giroy);
  Serial.print(",");
  Serial.println(acc_giroz);

  acc_primax =a.acceleration.x;
  acc_primay =a.acceleration.y;
  acc_primaz =a.acceleration.z;
  delay(50);

}