# LP médico/clínica — template de alta conversão (WhatsApp)

Página única, sem dependências, pensada para tráfego pago (Google/Meta) com
conversão por clique no WhatsApp.

## Como personalizar

1. **Marcadores**: busque `[[` em `index.html` e troque cada um (nome, CRM/RQE,
   especialidade, procedimento, cidade, endereço, nota e nº de avaliações no Google).
2. **WhatsApp**: troque `55DDDNUMERO` (todas as ocorrências) pelo número com DDI e DDD,
   ex.: `5541999999999`.
3. **Fotos**: troque cada `<div class="img-slot">` por um `<img>` (há um exemplo
   comentado no hero). Use WebP, ~1200px no lado maior.
4. **Cores**: ajuste as variáveis em `:root` no `styles.css`.
5. **GTM**: descomente o snippet no `<head>` e troque `GTM-XXXXXXX`.

## O que foi feito para converter

- **Um único objetivo**: todos os CTAs levam ao WhatsApp com mensagem pré-preenchida;
  o header não tem menu (menos rotas de fuga).
- **Acima da dobra**: promessa clara, 3 benefícios, CTA com microcopy que reduz
  ansiedade ("sem compromisso", "menos de 1 minuto") e prova social (nota no Google).
- **Barra fixa no mobile**: aparece quando o CTA do hero sai da tela e some na seção final.
- **Sequência persuasiva**: dor → solução → como funciona (3 passos) → resultados →
  depoimentos → para quem é / não é → autoridade → FAQ de objeções → CTA final.
- **Objeções tratadas no FAQ**: dor, recuperação, prazo, preço, obrigação de fazer, como agendar.
- **Tracking**: evento `whatsapp_click` com `cta_position` (header, hero, solucao, meio,
  final, sticky-mobile, float) e `faq_open` com a pergunta — use no GTM para saber
  qual bloco converte.
- **Atribuição**: se a URL tiver `utm_source`/`utm_campaign`/`gclid`/`fbclid`, a origem
  é anexada à mensagem do WhatsApp para a recepção identificar a campanha.
- **Performance**: HTML/CSS/JS puros, FAQ com `<details>` (funciona sem JS).

## Conformidade (CFM)

O texto evita promessas de resultado, superlativos e preço como chamariz. Antes de
publicar: antes/depois apenas com autorização do paciente e dentro da Res. CFM
2.336/2023, depoimentos reais (Google), e CRM/RQE visíveis.
