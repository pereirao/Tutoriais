public class Program
{
    static void Main(string[] args)
    {
        RequestProcessor processor = new RequestProcessor();

        StringRequest stringRequest = new StringRequest { Value = "Hello, world!" };
        IntegerRequest intRequest = new IntegerRequest { Value = 42 };
        BooleanRequest boolRequest = new BooleanRequest { Value = true };

        IResponse stringResponse = processor.ProcessRequest(stringRequest);
        IResponse intResponse = processor.ProcessRequest(intRequest);
        IResponse boolResponse = processor.ProcessRequest(boolRequest);

        Console.WriteLine(((StringResponse)stringResponse).Value);
        Console.WriteLine(((IntegerResponse)intResponse).Value);
        Console.WriteLine(((BooleanResponse)boolResponse).Value);
    }
}

// Interface for request objects
public interface IRequest { }

// Interface for response objects
public interface IResponse { }

// Abstract provider interface
public interface IProvider<TRequest, TResponse>
    where TRequest : IRequest
    where TResponse : IResponse
{
    TResponse Process(TRequest request);
}

// Concrete provider for processing string requests
public class StringProvider : IProvider<StringRequest, StringResponse>
{
    public StringResponse Process(StringRequest request)
    {
        return new StringResponse($"You sent me a string: {request.Value}");
    }
}

// Concrete provider for processing integer requests
public class IntegerProvider : IProvider<IntegerRequest, IntegerResponse>
{
    public IntegerResponse Process(IntegerRequest request)
    {
        return new IntegerResponse($"You sent me an integer: {request.Value}");
    }
}

// Concrete provider for processing boolean requests
public class BooleanProvider : IProvider<BooleanRequest, BooleanResponse>
{
    public BooleanResponse Process(BooleanRequest request)
    {
        return new BooleanResponse($"You sent me a boolean: {request.Value}");
    }
}

// Request processor class that uses providers to process requests
public class RequestProcessor
{
    private List<IProvider<IRequest, IResponse>> _providers;

    public RequestProcessor()
    {
        _providers = new List<IProvider<IRequest, IResponse>>
        {
            new StringProvider(),
            new IntegerProvider() as IProvider<IRequest, IResponse>,
            new BooleanProvider() as IProvider<IRequest, IResponse>
        };
    }

    public IResponse ProcessRequest(IRequest request)
    {
        foreach (var provider in _providers)
        {
            if (provider.GetType().GetGenericArguments()[0] == request.GetType())
            {
                return provider.Process((dynamic)request);
            }
        }

        throw new ArgumentException("No provider found for this request type.");
    }
}

// Concrete request and response classes
public class StringRequest : IRequest
{
    public string Value { get; set; }
}

public class StringResponse : IResponse
{
    public string Value { get; set; }

    public StringResponse(string value)
    {
        Value = value;
    }
}

public class IntegerRequest : IRequest
{
    public int Value { get; set; }
}

public class IntegerResponse : IResponse
{
    public string Value { get; set; }

    public IntegerResponse(string value)
    {
        Value = value;
    }
}

public class BooleanRequest : IRequest
{
    public bool Value { get; set; }
}

public class BooleanResponse : IResponse
{
    public string Value { get; set; }

    public BooleanResponse(string value)
    {
        Value = value;
    }
}

// Usage example
