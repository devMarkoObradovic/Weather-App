import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  temperature: number =0;
  feelsLikeTemp: number =0;
  humidity: number =0;
  pressure: number =0;
  summary: string ='';
  iconURL: string ='';
  city: string = 'Paracin';
  units: string = 'metric';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getweather(this.city, this.units).subscribe({

      next: (res) => {
        console.log(res),
        this.weatherData = res;
        console.log(this.weatherData);
        this.temperature = this.weatherData.main.temp;
        this.feelsLikeTemp = this.weatherData.main.feels_like;
        this.humidity = this.weatherData.main.humidity;
        this.pressure = this.weatherData.main.pressure;
        this.summary = this.weatherData.weather[0].main;
        this.iconURL = 'https://openweathermap.org/img/wn/' + this.weatherData.weather[0].icon + '@2x.png';
      },

      error: (error) => console.log(error.message),

      complete: () => console.info('API call completed')

    })
  }

}
