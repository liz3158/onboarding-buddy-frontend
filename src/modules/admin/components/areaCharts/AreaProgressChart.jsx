import './AreaProgressChart.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AreaProgressChart = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const data = [
    {
      id: 1,
      name: "Engineering Onboarding Handbook",
      views: 150,
      lastViewed: "2024-03-15",
      coverImage: "../src/assets/images/book1.jpg"
    },
    {
      id: 2,
      name: "IT Setup Checklist",
      views: 120,
      lastViewed: "2024-03-14",
      coverImage: "https://bookcover4u.com/pro/Business-book-cover-design-P1477724590BUB-Startup-Ideas-business-entrepreneurstartup-ideas.jpg"
    },
  ];

  const maxViews = Math.max(...data.map(item => item.views));

  const handleViewAll = () => {
    navigate('/admin/guidebooks');
  };

  return (
    <div className="area-progress-chart">
      <div className="chart-header">
        <div className="header-left">
          <h4 className="chart-title">{t('progress_chart_title')}</h4>
          <span className="chart-subtitle">{t('progress_chart_subtitle')}</span>
        </div>
        <button className="view-all-btn" onClick={handleViewAll}>
          {t('progress_chart_view_all')}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="chart-content">
        {data.map((item) => {
          const relativePercentage = (item.views / maxViews) * 100;
          
          return (
            <div className="chart-item" key={item.id}>
              <div className="item-image">
                <img src={item.coverImage} alt={item.name} />
              </div>
              <div className="item-details">
                <div className="item-info">
                  <div className="item-header">
                    <p className="item-name">{item.name}</p>
                    <p className="item-views">{item.views} {t('progress_chart_views')}</p>
                  </div>
                  <div className="item-meta">
                    <span className="last-viewed">
                      {t('progress_chart_last_viewed')}: {new Date(item.lastViewed).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${relativePercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AreaProgressChart;
