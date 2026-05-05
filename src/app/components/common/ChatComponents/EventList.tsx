import dayjs from "dayjs";

export interface EventItem {
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    boothNumber?: string;
    highlights: string[];
}






const EventList = ({events, primaryColor = '#007bff'}: {events:EventItem[],primaryColor?: string}) => {
  return (
        <div style={{ maxWidth: '550px', padding: '4px 0' }}>
            {/* Optional Section Header */}
            <div className="event-list-tile" style={{
                padding: '0 20px 8px',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#999',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
            }}>
                Upcoming Events ({events?.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {events?.map((event: EventItem, idx) => (
                    <EventCard key={(event?.startDate ?? 'startDate') +idx} event={event} primaryColor={primaryColor} />
                ))}
            </div>
        </div>
    );
}

export default EventList

const EventCard = ({event, primaryColor}: {event: EventItem; primaryColor: string}) => {
  return (
          <div className={'widget-message-subtile'}
              style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px',
                  margin: '0 16px 12px 16px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  border: '1px solid #eee',
                  borderLeft: `4px solid #1a56db`, // Creative accent
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
          >
              {/* Date Badge */}
              <div style={{
                  minWidth: '54px',
                  height: '60px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: `${primaryColor}10`, // 10% opacity version of primary
                  borderRadius: '12px',
                  color: primaryColor,
                  border: `1px solid ${primaryColor}20`
              }}>
                  <div style={{ fontSize: '10px', fontWeight: 'bold', lineHeight: '1' }}>
                   
                    {event?.startDate ? dayjs(event?.startDate)?.format('MMM')  : '-'}
                    </div>
                  <div style={{ fontSize: '20px', fontWeight: '800', lineHeight: '1.2' }}>
                   {event?.startDate ? dayjs(event?.startDate)?.format('DD')  : '-'}
                    </div>
              </div>
  
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#1a1a1a', marginBottom: '2px' }}>
                      {event?.name ?? '-'}
                  </div>
  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#666', marginBottom: '10px' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {event?.location ?? '-'} • 
                          {event?.startDate ? `${dayjs(event?.startDate)?.format('MMM')} ${dayjs(event?.startDate)?.format('DD')}`  : '-'}
                          {event?.endDate ? `- ${dayjs(event?.endDate)?.format('DD')}`  : ''}
                      </span>
                  </div>
  
                  <div style={{ fontSize: '14px', color: '#444', lineHeight: '1.6', marginBottom: '10px' }}>
                      {event?.description ?? '-'}
                  </div>
  
                  {/* Booth & Highlights */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px' }}>
                      {event?.boothNumber && (
                          <span style={{
                              fontSize: '10px',
                              fontWeight: '600',
                              padding: '2px 8px',
                              backgroundColor: '#f0f0f0',
                              borderRadius: '10px',
                              color: '#444'
                          }}>
                              📍 Booth {event?.boothNumber ?? '-'}
                          </span>
                      )}
                      {event?.highlights.map((h) => (
                          <span style={{
                              fontSize: '10px',
                              padding: '2px 8px',
                              backgroundColor: '#f8f9fa',
                              border: '1px solid #eee',
                              borderRadius: '10px',
                              color: '#666'
                          }}>
                              {h ?? '-'}
                          </span>
                      ))}
                  </div>
              </div>
          </div>
      );
}

