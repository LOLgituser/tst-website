// Preview templates for Decap CMS v3
// Shows content styled to match TST site's black-gold aesthetic

var h = React.createElement;

function PreviewWrap(title, content) {
  return h('div', {style: {background:'#0A0A0A',color:'#F5F0E8',padding:'2rem',fontFamily:'sans-serif',minHeight:'100vh'}},
    h('h3', {style: {color:'#B89E62',fontSize:'0.8rem',letterSpacing:'0.1em',marginBottom:'1rem'}}, title),
    content
  );
}

CMS.registerPreviewTemplate("blog", function(props) {
  var d = props.entry.get('data').toJS();
  return PreviewWrap('📝 文章预览',
    h('div', {style: {maxWidth:'800px',margin:'0 auto'}},
      h('span', {style: {color:'#B89E62',fontSize:'0.8rem',textTransform:'uppercase'}}, d.category || ''),
      h('span', {style: {color:'rgba(245,240,232,0.3)',fontSize:'0.8rem',marginLeft:'1rem'}}, d.date || ''),
      h('h1', {style: {fontSize:'2rem',margin:'0.5rem 0 1.5rem'}}, d.title || ''),
      h('p', {style: {color:'rgba(245,240,232,0.4)',fontStyle:'italic',borderLeft:'2px solid #B89E62',paddingLeft:'1rem'}}, d.excerpt || ''),
      h('div', {style: {color:'rgba(245,240,232,0.7)',lineHeight:'2',marginTop:'2rem'}}, d.body || ''),
      h('p', {style: {color:'rgba(245,240,232,0.25)',fontSize:'0.7rem',marginTop:'2rem'}}, '📐 封面图：1200×630px')
    )
  );
});

CMS.registerPreviewTemplate("site-settings", function(props) {
  var d = props.entry.get('data').toJS();
  var rows = [
    ['诊所名称', d.clinic_name],
    ['地址', d.address],
    ['电话', d.phone],
    ['微信', d.wechat],
    ['营业时间', d.hours],
    ['预约说明', d.booking_note],
    ['驾车指引', d.driving],
    ['地铁', d.subway]
  ];
  var children = [h('p', {style: {color:'rgba(245,240,232,0.3)',fontSize:'0.7rem',marginTop:'2rem'}}, '此信息显示在网站页脚和联系页面')];
  rows.forEach(function(r) {
    children.unshift(
      h('div', {style: {borderBottom:'1px solid rgba(255,255,255,0.05)',padding:'0.8rem 0',display:'flex'}},
        h('span', {style: {color:'rgba(245,240,232,0.4)',width:'120px',flexShrink:0}}, r[0]),
        h('span', {}, r[1] || h('span', {style: {color:'rgba(245,240,232,0.15)',fontStyle:'italic'}}, '未填写'))
      )
    );
  });
  return PreviewWrap('📋 站点联系信息预览',
    h('div', {style: {maxWidth:'600px'}}, children)
  );
});

CMS.registerPreviewTemplate("hero", function(props) {
  var d = props.entry.get('data').toJS();
  return PreviewWrap('🏠 首页 Hero 预览',
    h('div', {style: {padding:'4rem 2rem',textAlign:'center',background:'linear-gradient(180deg,#111,#0A0A0A)',border:'1px solid rgba(255,255,255,0.05)'}},
      h('h1', {style: {fontSize:'3rem',fontWeight:700,margin:'0 0 1rem',letterSpacing:'0.05em'}}, d.title || 'RECLAIM YOUR PRIME'),
      h('p', {style: {color:'rgba(245,240,232,0.5)',fontSize:'1.1rem',margin:'0 0 2rem'}}, d.subtitle || ''),
      h('span', {style: {display:'inline-block',background:'#B89E62',color:'#0A0A0A',padding:'0.8rem 2rem',fontWeight:600}}, d.cta_text || '申请加入')
    )
  );
});

CMS.registerPreviewTemplate("about", function(props) {
  var d = props.entry.get('data').toJS();
  return PreviewWrap('📄 关于我们预览',
    h('div', {style: {maxWidth:'700px'}},
      h('h2', {style: {fontSize:'2rem',margin:'0 0 1rem'}}, d.heading || ''),
      h('div', {style: {color:'rgba(245,240,232,0.7)',lineHeight:'1.8',marginBottom:'2rem'}}, d.description || ''),
      h('h3', {style: {color:'#B89E62',marginBottom:'0.5rem'}}, '使命'),
      h('div', {style: {color:'rgba(245,240,232,0.7)',lineHeight:'1.8'}}, d.mission || '')
    )
  );
});

CMS.registerPreviewTemplate("services", function(props) {
  var items = props.entry.getIn(['data','items']);
  var cards = [];
  if (items) {
    items.forEach(function(item) {
      var d = item.toJS();
      cards.push(
        h('div', {style: {background:'#111',border:'1px solid rgba(255,255,255,0.05)',padding:'1.5rem',marginBottom:'0.8rem'}},
          h('div', {style: {color:'#B89E62',fontSize:'0.7rem',textTransform:'uppercase',marginBottom:'0.3rem'}}, d.name_en || ''),
          h('h3', {style: {margin:'0 0 0.5rem',fontSize:'1.2rem'}}, d.name_cn || ''),
          h('p', {style: {color:'rgba(245,240,232,0.5)',margin:0,fontSize:'0.9rem'}}, d.tagline || '')
        )
      );
    });
  }
  return PreviewWrap('💪 六大服务预览', h('div', {style: {maxWidth:'600px'}}, cards));
});
