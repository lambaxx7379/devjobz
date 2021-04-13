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
      
      renderJobList(results);
    } catch (error) {
      console.error(error);
    }
  });
  
  function renderJobList(jobList) {
    $('#cow').remove();
    $('#results').empty();
  
    jobList.forEach(job => {
      $('#results').append(renderJob(job));
    });
  }
  
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
  