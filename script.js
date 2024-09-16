async function fetchData() {
  const response = await fetch('data.json');
  const data = await response.json();
  return data;
}
function createActivityCard(activity, timeframe) {
  const card = document.createElement('div');
  card.className = 'activity-card';
  card.style.backgroundColor = getActivityColor(activity.title);

  const current = activity.timeframes[timeframe].current;
  const previous = activity.timeframes[timeframe].previous;
  const timeframeText = getTimeframeText(timeframe);

  card.innerHTML = `
    <div class="activity-card-header"></div>
    <div class="activity-card-content">
      <div class="activity-title">
        <h2>${activity.title}</h2>
        <img src="images/icon-ellipsis.svg" alt="Options" class="ellipsis">
      </div>
      <div class="time">${current}hrs</div>
      <div class="previous-time">Last ${timeframeText} - ${previous}hrs</div>
    </div>
  `;

  return card;
}

function getActivityColor(title) {
  const colors = {
    'Work': 'var(--light-red)',
    'Play': 'var(--soft-blue)',
    'Study': 'var(--light-red-study)',
    'Exercise': 'var(--lime-green)',
    'Social': 'var(--violet)',
    'Self Care': 'var(--soft-orange)'
  };
  return colors[title] || 'var(--dark-blue)';
}

function getTimeframeText(timeframe) {
  const texts = {
    'daily': 'Day',
    'weekly': 'Week',
    'monthly': 'Month'
  };
  return texts[timeframe];
}

function updateDashboard(data, timeframe) {
  const activitiesGrid = document.getElementById('activitiesGrid');
  activitiesGrid.innerHTML = '';

  data.forEach(activity => {
    const card = createActivityCard(activity, timeframe);
    activitiesGrid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchData();
  const timeFrameBtns = document.querySelectorAll('.time-frame-btn');
  let currentTimeframe = 'weekly';

  updateDashboard(data, currentTimeframe);

  timeFrameBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeFrameBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTimeframe = btn.dataset.timeframe;
      updateDashboard(data, currentTimeframe);
    });
  });
});