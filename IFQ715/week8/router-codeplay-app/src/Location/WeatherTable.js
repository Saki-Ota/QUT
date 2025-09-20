import { Table } from "react-bootstrap";

export default function WeatherTable({ data }) {
  const { location, current } = data;
  return (
    <div className="col-lg-4">
      <section id="weather-extra-info">
        <div>
          <h3>
            {location?.name}, {location?.country}
          </h3>
        </div>
        <Table borderless striped>
          <tbody>
            <tr>
              <td className="fw-semibold">Wind (kph)</td>
              <td>{current?.wind_kph}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Wind (mph)</td>
              <td>{current?.wind_mph}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Wind Degree</td>
              <td>{current?.wind_degree}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Wind Direction</td>
              <td>{current?.wind_dir}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Pressure mb</td>
              <td>{current?.pressure_mb}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Pressure in</td>
              <td>{current?.pressure_in}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Precipitation (mm)</td>
              <td>{current?.precip_mm}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Precipitation (in)</td>
              <td>{current?.precip_in}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Humidity</td>
              <td>{current?.humidity}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Cloud</td>
              <td>{current?.cloud}</td>
            </tr>
            <tr>
              <td className="fw-semibold">UV</td>
              <td>{current?.uv}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Gust (kph)</td>
              <td>{current?.gust_kph}</td>
            </tr>
            <tr>
              <td className="fw-semibold">Gust (mph)</td>
              <td>{current?.gust_mph}</td>
            </tr>
          </tbody>
        </Table>
      </section>
    </div>
  );
}
