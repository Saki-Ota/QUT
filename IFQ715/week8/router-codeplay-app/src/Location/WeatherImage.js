export default function WeatherImage({ data }) {
  const { location, current } = data;

  return (
    <div className="col-lg-8">
      <section id="weather-feather">
        <img
          src="https://picsum.photos/id/10/900/500"
          className="card-img-top img-fluid rounded-top"
          alt="..."
        />
        <div className="d-flex justify-content-between align-items-center text-bg-info px-3 rounded-bottom">
          <span className="fs-3 fw-bolder">{location?.name}</span>
          <span className="fs-3">{current?.condition?.text}</span>
          <div>
            <span className="fs-3 fw-bolder me-3">{current?.temp_c}</span>
            <span className="fs-3">{current?.temp_f}</span>
          </div>
          <span className="fs-5">
            <img src={current?.condition?.icon} alt="" />
            {location?.localtime.split(" ")[1]}
          </span>
        </div>
      </section>
    </div>
  );
}
