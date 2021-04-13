async function fetchQuote() {
    const response = await fetch('/cowspiration');
    const { cow } = await response.json();
  
    $('#app > main').empty().append($(`<pre id="cow">${ cow }</pre>`))
  }
  
  fetchQuote();

$('#job-search').on('submit', async (event) => {
  event.preventDefault();

  try {
    const response = await fetch('/job-search', {
      method: "POST",
      body: JSON.stringify({
        description: $('#description').val(),
        fulltime: $('#fulltime').is(':checked')
      })
    });
  
    const { results } = await response.json();
    console.log(results)
    renderJobList(results);
  } catch (error) {
    console.error(error);
  }
});

function renderJob({
  company,
  company_logo,
  company_url,
  location,
  title,
  type,
  url,
  description,
  how_to_apply
}) {
  return $(`
    <div class="listing">
      <header>
        <div>
          <h2><a href="${ company_url }">${ company }</a></h2>
          <h3>${ location }</h3>
          <h3>${ type }, ${ title }</h3>
        </div>  
        <img src="${ company_logo }" />
      </header>
      <main>
        ${ description }
      </main>
      <footer>
        ${ how_to_apply }
      </footer>
    </div>
  `);
}
  
function renderJobList(jobList) {
  $('#cow').remove();
  $('#app > main').empty();
  jobList.forEach(job => {
    $('#app > main').append(renderJob(job));
  });
}

async function fetchWeather() {
  if (!navigator || !navigator.geolocation) {
    $('#weather').append($('<h3>Weather not available on this browser</h3>'))
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { coords: { latitude, longitude } } = position;

    const response = await fetch(`/weather?lat=${ latitude }&lon=${ longitude }`);
    const {results}  = await response.json();
    console.log(results)
    if (results.daily) {
      $('#weather').empty();

      results.daily.forEach(day => {
        const { weather: [{ icon }] } = day;

        $('#weather').append($(`
          <img src="http://openweathermap.org/img/wn/${ icon }@2x.png" />
        `));
      });
    }
  }, async (error) => {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    if (result.state == "denied") {
      $('#weather').html(
        $(`<div>
            <h3>You have denied access to location services.</h3>
            <h4>If you wish to see your forecast, update your settings and refresh.</h4>
          </div>`)
      )
    }
  });
}

fetchWeather();