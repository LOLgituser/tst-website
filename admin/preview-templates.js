// Preview templates — shows content styled like the actual TST site
CMS.registerPreviewTemplate("site-settings", createPreview(function(entry) {
  var data = entry.get('data').toJS();
  return '<div style="background:#0A0A0A;color:#F5F0E8;padding:2rem;font-family:sans-serif;min-height:100vh">' +
    '<h3 style="color:#B89E62;font-size:0.8rem;letter-spacing:0.1em;margin-bottom:1rem">📋 站点联系信息预览</h3>' +
    '<table style="width:100%;border-collapse:collapse">' +
    row('诊所名称', data.clinic_name) +
    row('地址', data.address) +
    row('电话', data.phone) +
    row('微信', data.wechat) +
    row('营业时间', data.hours) +
    row('预约说明', data.booking_note) +
    row('驾车指引', data.driving) +
    row('地铁', data.subway) +
    '</table>' +
    '<p style="color:rgba(245,240,232,0.3);font-size:0.7rem;margin-top:2rem">此信息将显示在页脚和联系页面</p></div>';
}));

CMS.registerPreviewTemplate("hero", createPreview(function(entry) {
  var data = entry.get('data').toJS();
  return '<div style="background:#0A0A0A;color:#F5F0E8;padding:2rem;font-family:sans-serif;min-height:100vh">' +
    '<h3 style="color:#B89E62;font-size:0.8rem;letter-spacing:0.1em;margin-bottom:1rem">🏠 Hero 大标题预览</h3>' +
    '<div style="padding:4rem 2rem;text-align:center;background:linear-gradient(180deg,#111 0%,#0A0A0A 100%);border:1px solid rgba(255,255,255,0.05)">' +
    '<h1 style="font-size:3rem;font-weight:700;margin:0 0 1rem;letter-spacing:0.05em">' + (data.title || 'RECLAIM YOUR PRIME') + '</h1>' +
    '<p style="color:rgba(245,240,232,0.5);font-size:1.1rem;margin:0 0 2rem">' + (data.subtitle || '') + '</p>' +
    '<span style="display:inline-block;background:#B89E62;color:#0A0A0A;padding:0.8rem 2rem;font-weight:600">' + (data.cta_text || '申请加入') + '</span>' +
    '</div></div>';
}));

CMS.registerPreviewTemplate("about", createPreview(function(entry) {
  var data = entry.get('data').toJS();
  return '<div style="background:#0A0A0A;color:#F5F0E8;padding:2rem;font-family:sans-serif;min-height:100vh">' +
    '<h3 style="color:#B89E62;font-size:0.8rem;letter-spacing:0.1em;margin-bottom:1rem">📄 关于我们预览</h3>' +
    '<h2 style="font-size:2rem;margin:0 0 1rem">' + (data.heading || '') + '</h2>' +
    '<div style="color:rgba(245,240,232,0.7);line-height:1.8;margin-bottom:2rem">' + (data.description || '') + '</div>' +
    '<h3 style="color:#B89E62;margin-bottom:0.5rem">使命</h3>' +
    '<div style="color:rgba(245,240,232,0.7);line-height:1.8">' + (data.mission || '') + '</div></div>';
}));

CMS.registerPreviewTemplate("blog", createPreview(function(entry) {
  var data = entry.get('data').toJS();
  return '<div style="background:#0A0A0A;color:#F5F0E8;padding:2rem;font-family:sans-serif;min-height:100vh;max-width:800px;margin:0 auto">' +
    '<h3 style="color:#B89E62;font-size:0.8rem;letter-spacing:0.1em;margin-bottom:1rem">📝 文章详情预览</h3>' +
    '<span style="color:#B89E62;font-size:0.8rem;text-transform:uppercase">' + (data.category || '') + '</span>' +
    '<span style="color:rgba(245,240,232,0.3);font-size:0.8rem;margin-left:1rem">' + (data.date || '') + '</span>' +
    '<h1 style="font-size:2rem;margin:0.5rem 0 1.5rem">' + (data.title || '') + '</h1>' +
    '<p style="color:rgba(245,240,232,0.4);font-style:italic;border-left:2px solid #B89E62;padding-left:1rem">' + (data.excerpt || '') + '</p>' +
    '<div style="color:rgba(245,240,232,0.7);line-height:2;margin-top:2rem">' + (data.body || '') + '</div>' +
    '<p style="color:rgba(245,240,232,0.3);font-size:0.7rem;margin-top:2rem">📐 封面图建议：1200×630px，用于列表卡片和社交分享</p></div>';
}));

CMS.registerPreviewTemplate("services", createPreview(function(entry) {
  var items = entry.getIn(['data', 'items']);
  var html = '<div style="background:#0A0A0A;color:#F5F0E8;padding:2rem;font-family:sans-serif;min-height:100vh"><h3 style="color:#B89E62;font-size:0.8rem;letter-spacing:0.1em;margin-bottom:1rem">💪 六大服务预览</h3>';
  if (items) {
    items.forEach(function(item) {
      var d = item.toJS();
      html += '<div style="background:#111;border:1px solid rgba(255,255,255,0.05);padding:1.5rem;margin-bottom:0.8rem">' +
        '<h4 style="margin:0 0 0.3rem;color:#B89E62;font-size:0.7rem;text-transform:uppercase">' + (d.name_en || '') + '</h4>' +
        '<h3 style="margin:0 0 0.5rem;font-size:1.2rem">' + (d.name_cn || '') + '</h3>' +
        '<p style="color:rgba(245,240,232,0.5);margin:0;font-size:0.9rem">' + (d.tagline || '') + '</p></div>';
    });
  }
  return html + '</div>';
}));

function createPreview(fn) {
  return {
    component: {
      preview: function(props) { return { render: function() { return fn(props.entry); } }; }
    }
  };
}

function row(label, value) {
  return '<tr style="border-bottom:1px solid rgba(255,255,232,0.05)"><td style="padding:0.8rem 1rem;color:rgba(245,240,232,0.4);width:120px;vertical-align:top">' + label + '</td><td style="padding:0.8rem 1rem">' + (value || '<span style="color:rgba(245,240,232,0.2);font-style:italic">未填写</span>') + '</td></tr>';
}
