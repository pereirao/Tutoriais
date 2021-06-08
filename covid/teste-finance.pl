use Finance::Quote;
$q = Finance::Quote->new;
 
$q->timeout(60);
 
$conversion_rate = $q->currency("AUD","USD");
$q->set_currency("EUR");  # Return all info in Euros.
 
$q->require_labels(qw/price date high low volume/);
 
$q->failover(1); # Set failover support (on by default).
 
%quotes  = $q->fetch("nasdaq",@stocks);
$hashref = $q->fetch("nyse",@stocks);

