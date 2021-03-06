let TRstaticjsutils = (function(t) {
  return (
    (window.baidu = {
      namespace: {
        register: function(t) {
          for (var e = /^[_$a-z]+[_$a-z0-9]*/i, i = t.split('.'), n = [window], o = 0; o < i.length; o++) {
            if (!e.test(i[o])) throw new Error('Invalid namespace:' + i[o]);
            (n[o + 1] = n[o][i[o]]), void 0 === n[o + 1] && (n[o + 1] = new Object());
          }
        }
      },
      i18n: {
        getMessage: function(t, e) {
          if (e) {
            for (var i = 0, n = e.length; i < n; i++) e[i] = '' + e[i];
            return chrome.i18n.getMessage(t, e);
          }
          return chrome.i18n.getMessage(t);
        }
      }
    }),
    (String.prototype.getBytes = function() {
      var t = this.replace(/\n/g, 'xx').replace(/\t/g, 'x');
      return encodeURIComponent(t).replace(/%[A-Z0-9][A-Z0-9]/g, 'x').length;
    }),
    (String.prototype.trim = function() {
      return this.replace(/^\s*|\s*$/g, '');
    }),
    (Date.prototype.format = function(t) {
      let e = function(t, e) {
        let i = '',
          n = t < 0,
          o = String(Math.abs(t));
        return o.length < e && (i = new Array(e - o.length + 1).join('0')), (n ? '-' : '') + i + o;
      };
      if ('string' != typeof t) return this.toString();
      let i = function(e, i) {
          t = t.replace(e, i);
        },
        n = this.getFullYear(),
        o = this.getMonth() + 1,
        r = this.getDate(),
        s = this.getHours(),
        a = this.getMinutes(),
        l = this.getSeconds(),
        g = this.getMilliseconds();
      return (
        i(/yyyy/g, e(n, 4)),
        i(/yy/g, e(parseInt(n.toString().slice(2), 10), 2)),
        i(/MM/g, e(o, 2)),
        i(/M/g, o),
        i(/dd/g, e(r, 2)),
        i(/d/g, r),
        i(/HH/g, e(s, 2)),
        i(/H/g, s),
        i(/hh/g, e(s % 12, 2)),
        i(/h/g, s % 12),
        i(/mm/g, e(a, 2)),
        i(/m/g, a),
        i(/ss/g, e(l, 2)),
        i(/s/g, l),
        i(/SSS/g, e(g, 3)),
        i(/S/g, g),
        t
      );
    }),
    (window.alert = function(t) {
      window.clearTimeout(window.feHelperAlertMsgTid);
      let e = document.querySelector('#fehelper_alertmsg');
      if (e) (e.querySelector('p').innerHTML = t), (e.style.display = 'block');
      else {
        let i = document.createElement('div');
        (i.innerHTML =
          '<div id="fehelper_alertmsg" style="position:fixed;top:5px;right:5px;z-index:1000000"><p style="background:#000;display:inline-block;color:#fff;text-align:center;padding:10px 10px;margin:0 auto;font-size:14px;border-radius:4px;">' +
          t +
          '</p></div>'),
          (e = i.childNodes[0]),
          document.body.appendChild(e);
      }
      window.feHelperAlertMsgTid = window.setTimeout(function() {
        e.style.display = 'none';
      }, 3e3);
    }),
    (t.exports.getCurrAbsPath = function() {
      let t,
        e = /((?:http|https|file|chrome-extension):\/\/.*?\/[^:]+)(?::\d+)?:\d+/;
      try {
        a.b();
      } catch (e) {
        t = e.fileName || e.sourceURL || e.stack || e.stacktrace;
      }
      if (t) return e.exec(t)[1];
    }),
    t.exports
  );
})({ exports: {} });
new Vue({
  el: '#pageContainer',
  data: {
    txtNow: Math.round(new Date().getTime() / 1e3),
    txtNowDate: new Date(),
    txtSrcStamp: '',
    txtDesDate: '',
    txtLocale: '',
    txtDesStamp: '',
    secFrom: 's',
    secTo: 's',
    worldTime: {},
    curGMT: (new Date().getTimezoneOffset() / 60) * -1
  },
  mounted: function() {
    this.startTimestamp();
  },
  methods: {
    startTimestamp: function() {
      let t = 'yyyy-MM-dd HH:mm:ss';
      window.intervalId = window.setInterval(() => {
        let e = new Date(),
          i = new Date(e.getTime() + 6e4 * e.getTimezoneOffset()),
          n = new Date(i.getTime() + 60 * this.curGMT * 6e4);
        (this.txtNowDate = n.format(t)),
          (this.txtNow = Math.round(n.getTime() / 1e3) + ' s   / ' + n.getTime() + ' ms'),
          (this.worldTime.local = this.txtNowDate),
          (this.worldTime.gmt = i.format(t));
        for (let e = -12; e <= 12; e++) this.worldTime[e > 0 ? '+' + e : e] = new Date(i.getTime() + 60 * e * 6e4).format(t);
      }, 1e3);
    },
    unixToggle: function() {
      (window.toggleModel = window.toggleModel || 0),
        window.toggleModel
          ? ((this.$refs.btnToggle.value = '暂停'), (window.toggleModel = 0), this.startTimestamp())
          : ((this.$refs.btnToggle.value = '开始'), (window.toggleModel = 1), window.clearInterval(window.intervalId));
    },
    stampToLocale: function() {
      if (0 === this.txtSrcStamp.length) return void alert('请先填写你需要转换的Unix时间戳');
      if (!parseInt(this.txtSrcStamp, 10)) return void alert('请输入合法的Unix时间戳');
      let t = 's' === this.secFrom ? 1e3 : 1,
        e = 'yyyy-MM-dd HH:mm:ss' + ('s' === this.secFrom ? '' : ':SSS');
      this.txtDesDate = new Date(parseInt(this.txtSrcStamp, 10) * t).format(e);
    },
    localeToStamp: function() {
      this.txtLocale && !/\s\d+:\d+:\d+/.test(this.txtLocale) && (this.txtLocale += ' 00:00:00');
      let t = Date.parse(this.txtLocale);
      isNaN(t) && alert('请输入合法的时间格式，如：2014-04-01 10:01:01，或：2014-01-01');
      let e = 's' === this.secTo ? 1e3 : 1;
      this.txtDesStamp = Math.round(t / e);
    }
  }
});
