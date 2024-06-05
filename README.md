> Note: You will need [modern fonts](https://github.com/ryanoasis/nerd-fonts) to be able to view `Flags`
---
- #### Simple (`text`) : [/](https://ip.ajam.dev/) `-->` [https://ip.ajam.dev/](https://ip.ajam.dev/)
> Returns plain `IPv4 | IPv6`
```bash
curl -qfsSL "https://ip.ajam.dev"
```
---
- #### Detailed (`csv`) : [/csv](https://ip.ajam.dev/csv) `-->` [https://ip.ajam.dev/csv](https://ip.ajam.dev/csv)
> Returns csv `IPv4 | IPv6`, `GeoInfo` & `User-Agent`
```bash
!#Using: curl + column
curl -qfsSL "https://ip.ajam.dev/csv" | column -ts ','
```
> <details><summary><code>Example Response</code></summary>
>
>```
> ip           city       country  flag  region     latitude   longitude  org         timezone           user-agent   readme
> 18.227.3.14  São Paulo  BR       🇧🇷    São Paulo  -23.53350  -46.63590  Amazon.com  America/Sao_Paulo  curl/7.88.1  https://github.com/Azathothas/ip.ajam.dev
>```
> </details>
---
- #### Detailed (`json`) : [/json](https://ip.ajam.dev/json) `-->` [https://ip.ajam.dev/json](https://ip.ajam.dev/json)
> Returns json `IPv4 | IPv6`, `GeoInfo` & `User-Agent`
```bash
!#Using: curl + https://github.com/jqlang/jq
curl -qfsSL "https://ip.ajam.dev/json" | jq '.'
```
> <details><summary><code>Example Response</code></summary>
>
> ```json
> {
> "ip": "18.227.3.14",
> "city": "São Paulo",
> "country": "BR",
> "flag": "🇧🇷",
> "region": "São Paulo",
> "latitude": "-23.53350",
> "longitude": "-46.63590",
> "org": "Amazon.com",
> "timezone": "America/Sao_Paulo",
> "user-agent": "curl/7.88.1",
> "readme": "https://github.com/Azathothas/ip.ajam.dev"
> }
> ```
> </details>
---
- #### Detailed (`text`) : [/text](https://ip.ajam.dev/text) `-->` [https://ip.ajam.dev/text](https://ip.ajam.dev/text)
> Returns text `IPv4 | IPv6`, `GeoInfo` & `User-Agent`
```bash
curl -qfsSL "https://ip.ajam.dev/text"
```
> <details><summary><code>Example Response</code></summary>
>
> ```bash
> ip=18.227.3.14
> city=São Paulo
> country=BR
> flag=🇧🇷
> region=São Paulo
> latitude=-23.53350
> longitude=-46.63590
> org=Amazon.com
> timezone=America/Sao_Paulo
> user-agent=curl/7.88.1
> readme=https://github.com/Azathothas/ip.ajam.dev
> ```
> </details>
---
- #### Detailed (`xml`) : [/xml](https://ip.ajam.dev/xml) `-->` [https://ip.ajam.dev/xml](https://ip.ajam.dev/xml)
> Returns xml `IPv4 | IPv6`, `GeoInfo` & `User-Agent`
```bash
!#Using: curl + https://github.com/sibprogrammer/xq
curl -qfsSL "https://ip.ajam.dev/xml" | xq
```
> <details><summary><code>Example Response</code></summary>
>
> ```xml
> <?xml version="1.0" encoding="UTF-8"?>
> <data>
>   <ip>18.227.3.14</ip>
>   <city>São Paulo</city>
>   <country>BR</country>
>   <flag>🇧🇷</flag>
>   <region>São Paulo</region>
>   <latitude>-23.53350</latitude>
>   <longitude>-46.63590</longitude>
>   <org>Amazon.com</org>
>   <timezone>America/Sao_Paulo</timezone>
>   <user-agent>curl/7.88.1</user-agent>
>   <readme>https://github.com/Azathothas/ip.ajam.dev</readme>
> </data>
> ```
> </details>
---
- #### Detailed (`yaml`) : [/yaml](https://ip.ajam.dev/yaml) `-->` [https://ip.ajam.dev/yaml](https://ip.ajam.dev/yaml)
> Returns yaml `IPv4 | IPv6`, `GeoInfo` & `User-Agent`
```bash
!#Using: curl + https://github.com/mikefarah/yq
curl -qfsSL "https://ip.ajam.dev/yaml" | yq '.'
```
> <details><summary><code>Example Response</code></summary>
>
> ```yaml
> ip: "18.227.3.14"
> city: "São Paulo"
> country: "BR"
> flag: "🇧🇷"
> region: "São Paulo"
> latitude: "-23.53350"
> longitude: "-46.63590"
> org: "Amazon.com"
> timezone: "America/Sao_Paulo"
> user-agent: "curl/7.88.1"
> readme: "https://github.com/Azathothas/ip.ajam.dev"
> ```
> </details> 
---
#### Deploy (Note to Self)
```bash
!# Install Wrangler: https://developers.cloudflare.com/workers/wrangler/install-and-update/
npm install "wrangler@latest" -g

!# Clone Source
git clone --filter="blob:none" "https://github.com/Azathothas/ip.ajam.dev"
cd "./ip.ajam.dev"
code "./ip.ajam.dev"

!# Deploy
npm install ; wrangler login
wrangler deploy

!# Dashboard >> Workers & Pages >> ip-api >> Settings >> Custom Domains >> Add: ip.ajam.dev
```
